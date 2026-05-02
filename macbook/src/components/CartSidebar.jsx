import { useContext } from "react";
import { useCart } from "../context/useCart";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const CartSidebar = () => {
  const { discount } = useContext(CartContext);
  const navigate = useNavigate();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeItem
  } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1), 0);
  const discountAmount = discount?.percent ? subtotal * (discount.percent / 100) : 0;
  const totalPrice = subtotal - discountAmount;

  return (
    <>
      {/* Invisible Overlay for closing */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Mini-Cart Dropdown */}
      <div
        className={`fixed top-14 right-4 lg:right-10 w-[320px] bg-[#1c1c1e]/95 backdrop-blur-xl text-white z-50 rounded-2xl shadow-2xl border border-gray-800
          transform transition-all duration-300 ease-out origin-top-right
        ${isCartOpen ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"}`}
      >
        <div className="flex flex-col max-h-[70vh] p-5">

          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-100">Your Bag</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-500 hover:text-white text-lg transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-hide">
            {cart.length === 0 ? (
              <p className="text-gray-400 text-sm py-4">Your bag is empty.</p>
            ) : (
              cart.map(item => (
                <div
                  key={item.id}
                  className="flex gap-3 border-b border-gray-800/50 pb-4"
                >
                  {/* Image removed as requested */}

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm leading-tight text-gray-200 line-clamp-2 pr-2">{item.name}</p>
                        {item.color && <p className="text-xs text-gray-500 mt-0.5">{item.color}</p>}
                        {item.storage && <p className="text-xs text-gray-500">{item.storage}</p>}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-500 hover:text-white transition-colors flex-shrink-0"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex justify-between items-end mt-2">
                      <span className="text-xs text-gray-400">Qty: {item.quantity || 1}</span>
                      <p className="text-sm font-medium text-white">
                        ${((Number(item.price) || 0) * (item.quantity || 1)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div id="discount" className="mt-2">
            {!!discount && (
              <div className="text-green-400 text-sm font-medium">
                Discount Applied: {discount.percent}% (−${discountAmount.toFixed(2)})
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-4 mt-2">
            <div className="flex justify-between mb-4 text-base font-medium">
              <span className="text-gray-300">Total</span>
              <span className="text-white">${totalPrice.toFixed(2)}</span>
            </div>

            <button
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={cart.length === 0}
              onClick={() => {
                setIsCartOpen(false);
                navigate("/checkout");
              }}
            >
              Check Out
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default CartSidebar;