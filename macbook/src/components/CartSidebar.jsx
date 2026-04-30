import { useContext } from "react";
import { useCart } from "../context/useCart";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const CartSidebar = () => {
  const {discount} = useContext(CartContext);
  const navigate = useNavigate();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    increaseQuantity,
    decreaseQuantity,
    removeItem
  } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => {
            setIsCartOpen(false);
          }}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[380px] bg-black text-white z-50 px-6 border-amber-200
          border-l border-white/10 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]
          transform transition-transform duration-300 ease-in-out
        ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full px-6 py-6">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Your Cart</h2>
            <button onClick={() => setIsCartOpen(false)}>✕</button>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto space-y-5 pr-1">
            {cart.length === 0 ? (
              <p className="text-gray-400">Your cart is empty</p>
            ) : (
              cart.map(item => (
                <div
                  key={item.id}
                  className="border-b border-gray-800 pb-4"
                >
                  <div className="flex justify-between items-start">
                    
                    {/* Info */}
                    <div>
                      <p className="font-medium">{item.product_name}</p>
                      <p className="text-sm text-gray-400">
                        ${item.product_price}
                      </p>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sm text-gray-400 hover:text-white"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center mt-3 gap-3">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-7 h-7 bg-gray-800 rounded flex items-center justify-center"
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="w-7 h-7 bg-gray-800 rounded flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            )}
            
          </div>

          <div id="discount">
            {discount && (
            <div className="text-green-500">
              Discount: {discount.percent}%
            </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-800 pt-5 mt-5">
            <div className="flex justify-between mb-4 text-lg">
              <span>Total</span>
              <span>${totalPrice - (discount.percent ? totalPrice * (discount.percent / 100) : 0).toFixed(2)}</span>
            </div>

            <button 
              className="w-full bg-white text-black py-3 rounded-full font-medium hover:bg-gray-200 transition"
              onClick={() => {
                setIsCartOpen(false);
                navigate("/checkout");
              }}
            >
              Checkout
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default CartSidebar;