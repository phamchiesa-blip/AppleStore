import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        
        <div className="w-20 h-20 mx-auto rounded-full bg-white text-black flex items-center justify-center text-4xl font-bold mb-6">
          ✓
        </div>

        <h1 className="text-4xl font-semibold mb-4">
          Order Confirmed
        </h1>

        <p className="text-gray-400 mb-8 leading-relaxed">
          Thank you for your purchase. Your order has been successfully placed and is now being processed.
        </p>

        <Link
          to="/"
          className="inline-block rounded-full bg-white px-8 py-3 text-black font-medium hover:bg-gray-200 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;