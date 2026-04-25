const API_URL = "http://localhost:5000/api/cart";

export const addToCart = async (product) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    return await response.json();
  } catch (error) {
    console.error("Add to cart error:", error);
  }
};

export const getCartItems = async () => {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    console.error("Get cart items error:", error);
  }
};

export const updateCartItem = async (id, quantity) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });

    return await response.json();
  } catch (error) {
    console.error("Update cart error:", error);
  }
};

export const deleteCartItem = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    return await response.json();
  } catch (error) {
    console.error("Delete cart error:", error);
  }
};