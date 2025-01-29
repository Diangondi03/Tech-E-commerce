import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Error from './Error.tsx'
import Layout from './Layout/Layout.tsx'
import Home from './Home.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />

    </Route>
    <Route path="*" element={<Error />} />
  </Routes>
  </BrowserRouter>
)
