import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './mac.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from './context/CartProvider';
import CartSidebar from './components/CartSidebar.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <CartProvider>
        <App />
        <CartSidebar />
      </CartProvider>
    </StrictMode>
  </BrowserRouter>
)
