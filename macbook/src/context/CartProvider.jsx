import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import {
  addToCart as addToCartAPI,
  getCartItems,
  updateCartItem,
  deleteCartItem,
} from "../services/cartApi";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [coupon, setCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [applied, setApplied] = useState(false);

  const fetchCart = async () => {
    const data = await getCartItems();
    const mappedData = Array.isArray(data) ? data.map(item => ({
      ...item,
      name: item.product_name,
      price: item.product_price,
      image: item.product_image
    })) : [];
    setCart(mappedData);
  };

  // Load cart from backend when app starts
  useEffect(() => {
    fetchCart();
  }, []);

  const clearCart = () => setCart([]);

  const addToCart = async (product) => {
    await addToCartAPI({
      product_id: product.id,
      product_name: product.name,
      product_price: product.price,
      product_image: product.image,
    });

    await fetchCart();
  };

  const increaseQuantity = async (id) => {
    const item = cart.find((item) => item.id === id);
    if (!item) return;

    await updateCartItem(id, item.quantity + 1);
    await fetchCart();
  };

  const decreaseQuantity = async (id) => {
    const item = cart.find((item) => item.id === id);
    if (!item) return;

    if (item.quantity <= 1) {
      await deleteCartItem(id);
    } else {
      await updateCartItem(id, item.quantity - 1);
    }

    await fetchCart();
  };

  const removeItem = async (id) => {
    await deleteCartItem(id);
    await fetchCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        isCartOpen,
        setIsCartOpen,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
      coupon,
      setCoupon,
      discount,
      setDiscount,
      applied,
      setApplied
      }}
    >
      {children}
    </CartContext.Provider>
  );
};