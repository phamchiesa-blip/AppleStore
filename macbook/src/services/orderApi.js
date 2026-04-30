const ORDER_API_URL = "http://localhost:5000/api/orders";

export const placeOrder = async (orderData) => {
  try {
    const response = await fetch(ORDER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    return await response.json();
  } catch (error) {
    console.error("Place order error:", error);
  }
};