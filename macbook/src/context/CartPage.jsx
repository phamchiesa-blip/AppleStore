import { useCart } from "../context/useCart";

const CartPage = () => {
  const { cart } = useCart();

  return (
    <div className="container mx-auto px-5 text-white">
      <h1 className="text-3xl mb-5">Your Cart</h1>

      {cart.map(item => (
        <div key={item.id} className="flex justify-between mb-4">
          <p>{item.name}</p>
          <p>{item.quantity}</p>
        </div>
      ))}
    </div>
  );
};

export default CartPage;