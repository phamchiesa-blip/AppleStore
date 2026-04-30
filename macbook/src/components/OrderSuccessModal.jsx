const OrderSuccessModal = ({ isOpen, onContinue }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[90%] max-w-md rounded-2xl bg-[#111] border border-white/10 p-6 text-white shadow-2xl">
        
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center text-2xl font-bold mb-4">
            ✓
          </div>

          <h2 className="text-2xl font-semibold mb-2">
            Order Placed
          </h2>

          <p className="text-gray-400 mb-6">
            Your order has been placed successfully.
          </p>

          <button
            onClick={onContinue}
            className="w-full rounded-full bg-white py-3 text-black font-medium hover:bg-gray-200 transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessModal;