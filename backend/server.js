const express = require('express');
const admin = require('firebase-admin');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require("jsonwebtoken")
const verifyToken = require('./authMiddleware');

const app = express();
const port = 3000;

// Load environment variables from .env file
dotenv.config();

// Middleware to parse JSON
app.use(express.json());
// Enable CORS for all routes
// Custom CORS configuration
const corsOptions = {
  origin: 'http://localhost:5000', // Replace with your frontend domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Initialize Firebase Admin SDK using environment variables
admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
  }),
  databaseURL: 'https://(default).firebaseio.com'
});

const db = admin.firestore();

app.post('/signup', async (req, res) => {
  const { name,email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const docRef = db.collection('users').doc();
    await docRef.set({ name,email, hashedPassword, cart:[] });
    res.send('User added successfully');
  } catch (error) {
    console.error('Error adding user: ', error);
    res.status(500).send('Server Error');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRef = db.collection('users').where('email', '==', email);
    const snapshot = await userRef.get();

    if (snapshot.empty) {
      return res.status(404).send('User not found');
    }

    const userDoc = snapshot.docs[0];
    const user = userDoc.data();

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    const token = jwt.sign(
      {
        id: userDoc.id,
        name: user.name,
        email: user.email

      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );


    if (!isPasswordValid) {
      return res.status(401).send('Invalid password');
    }

    res.status(200).send({ token });
  } catch (error) {
    console.error('Error logging in: ', error);
    res.status(500).send('Server Error');
  }
});


app.get('/get-user/:id',verifyToken, async (req, res) => {
  const userId = req.params.id;

  try {
    const docRef = db.collection('users').doc(userId);
    const doc = await docRef.get();
    if (!doc.exists) {
      res.status(404).send('User not found');
    } else {
      const userData = doc.data();
      res.status(200).send(userData);
    }
  } catch (error) {
    console.error('Error getting user: ', error);
    res.status(500).send('Server Error');
  }
});

app.put('/update-user/:id',verifyToken, async (req, res) => {
  const userId = req.params.id;
  const { name,email, password } = req.body;

  try {
    const docRef = db.collection('users').doc(userId);
    if(password.length>0){
      const hashedPassword = await bcrypt.hash(password, 10);
      await docRef.update({ name,email, hashedPassword });
    }
    else{
      await docRef.update({ name,email });
    }

    res.status(200).send('User updated successfully');
  } catch (error) {
    console.error('Error updating user: ', error);
    res.status(500).send('Server Error');
  }
});


app.post('/add-product',verifyToken, async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).send('User not found');
    }

    const cart = userDoc.data().cart || [];
    const productIndex = cart.findIndex(item => item.productId === productId);

    if (productIndex > -1) {
      cart[productIndex].quantity += 1;
    } else {
      cart.push({ productId, quantity: 1 });
    }

    await userRef.update({ cart });
    res.status(200).send('Product added to cart successfully');
  } catch (error) {
    console.error('Error adding product to cart: ', error);
    res.status(500).send('Server Error');
  }
});

app.post('/remove-product',verifyToken, async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).send('User not found');
    }

    const cart = userDoc.data().cart || [];
    const updatedCart = cart.filter(item => item.productId !== productId);

    await userRef.update({ cart: updatedCart });
    res.status(200).send('Product removed from cart successfully');
  } catch (error) {
    console.error('Error removing product from cart: ', error);
    res.status(500).send('Server Error');
  }
});

app.post('/update-product-quantity',verifyToken, async (req, res) => {
  const { userId, productId, quantity } = req.body;
  console.log(userId, productId, quantity)
  try {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).send('User not found');
    }

    const cart = userDoc.data().cart || [];
    const productIndex = cart.findIndex(item => item.productId === productId);

    if (productIndex > -1) {
      if(quantity === 0) {
        const updatedCart = cart.filter(item => item.productId !== productId);

        await userRef.update({ cart: updatedCart });
        return res.status(200).send('Product removed from cart successfully');
      }
      cart[productIndex].quantity = quantity;

      await userRef.update({ cart });
      res.status(200).send('Product quantity updated successfully');
    } else {
      res.status(404).send('Product not found in cart');
    }
  } catch (error) {
    console.error('Error updating product quantity: ', error);
    res.status(500).send('Server Error');
  }
});

// Define a route to purchase the cart and clear it
app.post('/purchase',verifyToken, async (req, res) => {
  const { userId } = req.body;

  try {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).send('User not found');
    }

    const cart = userDoc.data().cart || [];

    if (cart.length === 0) {
      return res.status(400).send('Cart is empty');
    }

    await userRef.update({ cart: [] });
    res.status(200).send('Purchase successful and cart cleared');
  } catch (error) {
    console.error('Error processing purchase: ', error);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});