import { useCart } from "../context/useCart";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrderSuccessModal from "./OrderSuccessModal";
import { placeOrder } from "../services/orderApi";
import useAuthStore from "../store/authStore";

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuthStore();
  const [showSuccess, setShowSuccess] = useState(false);
  const [guestMessage, setGuestMessage] = useState("");
  const [formData, setFormData] = useState({
      fullName: "",
      address: "",
      phone: "",
      email: ""
  });

  useEffect(() => {
      if (user) {
          setFormData({
              fullName: user.full_name || user.username || "",
              address: user.address || "",
              phone: user.phone || "",
              email: user.email || ""
          });

          const fetchUserProfile = async () => {
              try {
                  const res = await fetch(`http://localhost:5000/api/users/${user.id}`);
                  if (res.ok) {
                      const data = await res.json();
                      setFormData(prev => ({
                          ...prev,
                          fullName: data.full_name || data.username || prev.fullName,
                          address: data.address || prev.address,
                          phone: data.phone || prev.phone,
                          email: data.email || prev.email
                      }));
                  }
              } catch (error) {
                  console.error("Error fetching user profile:", error);
              }
          };
          fetchUserProfile();
      }
  }, [user]);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
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

    if (!user && !formData.email.trim()) {
        newErrors.email = "Email is required for guest checkout";
    } else if (!user && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email address is invalid";
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

    if (!user) {
        orderData.email = formData.email;
    }

    try {
        const result = await placeOrder(orderData);

        if (result?.message === "Order placed successfully") {
            clearCart();
            if (!user) {
                setGuestMessage("Tài khoản đã được tự động tạo với mật khẩu là số điện thoại. Vui lòng kiểm tra email!");
            }
            setShowSuccess(true);
        }
    } catch (err) {
        console.error("Failed to place order", err);
        alert("Có lỗi xảy ra khi đặt hàng.");
    }
  };

  if (cart.length === 0 && !showSuccess) {
      return (
          <div className="min-h-screen bg-black text-white px-6 py-32 text-center mt-[50px]">
              <h1 className="text-4xl font-semibold mb-6">Your bag is empty.</h1>
              <button onClick={() => navigate('/')} className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200">
                  Continue Shopping
              </button>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 mt-[50px]">
      
      <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-semibold mb-10 text-center md:text-left">Checkout</h1>

          <div className="grid md:grid-cols-2 gap-10">

            {/* LEFT: Form */}
            <div className="space-y-6">
              <div className="bg-[#1c1c1e] p-6 rounded-2xl border border-gray-800 shadow-xl">
                  <h2 className="text-2xl font-medium mb-6">Delivery Information</h2>
                  
                  {!user && (
                      <p className="text-sm text-gray-400 mb-6 bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                          You are checking out as a Guest. An account will be automatically created for you.
                      </p>
                  )}

                  <div className="space-y-4">
                      <div>
                          <input
                            type="text"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={(e) =>
                              setFormData({ ...formData, fullName: e.target.value })
                            }
                            className={`w-full p-4 bg-black border ${errors.fullName ? 'border-red-500' : 'border-gray-800'} rounded-xl outline-none focus:border-gray-500 transition-colors`}
                          />
                          {errors.fullName && <p className="text-red-500 text-sm mt-1 ml-1">{errors.fullName}</p>}
                      </div>

                      {!user && (
                          <div>
                              <input
                                type="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={(e) =>
                                  setFormData({ ...formData, email: e.target.value })
                                }
                                className={`w-full p-4 bg-black border ${errors.email ? 'border-red-500' : 'border-gray-800'} rounded-xl outline-none focus:border-gray-500 transition-colors`}
                              />
                              {errors.email && <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>}
                          </div>
                      )}

                      <div>
                          <input
                            type="text"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            className={`w-full p-4 bg-black border ${errors.phone ? 'border-red-500' : 'border-gray-800'} rounded-xl outline-none focus:border-gray-500 transition-colors`}
                          />
                          {errors.phone && <p className="text-red-500 text-sm mt-1 ml-1">{errors.phone}</p>}
                      </div>

                      <div>
                          <textarea
                            placeholder="Delivery Address"
                            rows="3"
                            value={formData.address}
                            onChange={(e) =>
                              setFormData({ ...formData, address: e.target.value })
                            }
                            className={`w-full p-4 bg-black border ${errors.address ? 'border-red-500' : 'border-gray-800'} rounded-xl outline-none focus:border-gray-500 transition-colors resize-none`}
                          />
                          {errors.address && <p className="text-red-500 text-sm mt-1 ml-1">{errors.address}</p>}
                      </div>
                  </div>
              </div>
            </div>

            {/* RIGHT: Order summary */}
            <div>
                <div className="bg-[#1c1c1e] p-8 rounded-2xl border border-gray-800 shadow-xl sticky top-24">
                  <h2 className="text-2xl font-medium mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                      {cart.map(item => (
                        <div key={item.id} className="flex gap-4 items-center">
                          {/* Image removed as requested */}
                          <div className="flex-1">
                              <p className="font-medium text-sm leading-tight text-gray-200 line-clamp-2">{item.name}</p>
                              <p className="text-gray-500 text-sm mt-1">Qty: {item.quantity}</p>
                          </div>
                          <div className="font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="border-t border-gray-800 pt-6">
                      <div className="flex justify-between text-gray-400 mb-2">
                          <span>Subtotal</span>
                          <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-400 mb-4">
                          <span>Shipping</span>
                          <span>Free</span>
                      </div>
                      
                      <div className="border-t border-gray-800 my-4"></div>
                      
                      <div className="flex justify-between text-xl font-semibold text-white">
                          <span>Total</span>
                          <span>${totalPrice.toFixed(2)}</span>
                      </div>
                  </div>

                  <button
                    className="w-full mt-8 bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-500 transition-colors"
                    onClick={handleOrder}
                  >
                    Place Order
                  </button>
                </div>
            </div>

          </div>
      </div>

      <OrderSuccessModal
        isOpen={showSuccess}
        guestMessage={guestMessage}
        onContinue={() => {
          setShowSuccess(false);
          navigate("/");
        }}
      />

    </div>
  );
};

export default CheckoutPage;