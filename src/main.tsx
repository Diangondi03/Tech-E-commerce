import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Error from './pages/Error.tsx'
import Layout from './Layout/Layout.tsx'
import Home from './pages/Home.tsx'
import SearchResults from './pages/SearchResults.tsx'
import Category from './pages/Category.tsx'
import Cart from './Layout/Cart.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='/category/:categoryType' element={<Category/>}/>
      <Route path='/search' element={<SearchResults/>}/>
      <Route path='/cart' element={<Cart/>}/>
    </Route>
    <Route path="*" element={<Error />} />
  </Routes>
  </BrowserRouter>
)
