import { useCart } from "../context/useCart";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderSuccessModal from "./OrderSuccessModal";
import { placeOrder } from "../services/orderApi";

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
  fullName: "",
  address: "",
  phone: ""
  });

const [errors, setErrors] = useState({});
  const navigate = useNavigate();

const totalPrice = cart.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
);

const validateForm = () => {
  const newErrors = {};

  if (!formData.fullName.trim()) {
    newErrors.fullName = "Full Name is required";
  }

  if (!formData.address.trim()) {
    newErrors.address = "Address is required";
  }

  if (!formData.phone.trim()) {
    newErrors.phone = "Phone Number is required";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

const handleOrder = async () => {
  if (!validateForm()) return;

  const orderData = {
    customer_name: formData.fullName,
    phone: formData.phone,
    address: formData.address,
    payment_method: "Cash on Delivery",
  };

  const result = await placeOrder(orderData);

  if (result?.message === "Order placed successfully") {
    clearCart();
    setShowSuccess(true);
  }
};

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 mt-[50px]">
      
      <h1 className="text-5xl font-semibold mb-10">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT: Form */}
        <div className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className="w-full p-3 bg-[#111] rounded outline-none"
          />
          {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}
          <input
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full p-3 bg-[#111] rounded outline-none"
          />
          {errors.address && <p className="text-red-500">{errors.address}</p>}
          <input
            type="text"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full p-3 bg-[#111] rounded outline-none"
          />
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}
        </div>

        {/* RIGHT: Order summary */}
        <div className="bg-[#111] p-6 rounded-xl">
          <h2 className="text-xl mb-5">Order Summary</h2>

          {cart.map(item => (
            <div key={item.id} className="flex justify-between mb-3">
              <span>{item.product_name} x{item.quantity}</span>
              <span>${item.product_price * item.quantity}</span>
            </div>
          ))}

          <div className="border-t border-gray-700 my-4"></div>

          <div className="flex justify-between text-lg">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>

          <button
            className="w-full mt-6 bg-sky-500 text-black py-3 rounded-full font-medium hover:bg-sky-600"
            onClick={handleOrder}
          >
            Place Order
          </button>
        </div>

      </div>

      <OrderSuccessModal
        isOpen={showSuccess}
        onContinue={() => {
          setShowSuccess(false);
          navigate("/success");
        }}
      />

    </div>
  );
};

export default CheckoutPage;