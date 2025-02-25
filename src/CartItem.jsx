import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, removeItem } from "../CartSlice";

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate the subtotal for each item
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.substring(1)); // Extract numeric value from "$X.XX"
    return (item.quantity * price).toFixed(2);
  };

  // Calculate the total cost of all cart items
  const calculateTotalAmount = () => {
    return cartItems
      .reduce((total, item) => total + parseFloat(calculateTotalCost(item)), 0)
      .toFixed(2);
  };

  // Handle increment
  const handleIncrement = (name) => {
    dispatch(incrementQuantity({ name }));
  };

  // Handle decrement (removes item if quantity drops to 0)
  const handleDecrement = (name, quantity) => {
    if (quantity > 1) {
      dispatch(decrementQuantity({ name }));
    } else {
      dispatch(removeItem(name));
    }
  };

  // Remove an item from the cart
  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  // Alert for future checkout feature
  const handleCheckoutShopping = () => {
    alert("Functionality to be added for future reference");
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Plant</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.cost}</td>
                  <td>
                    <button onClick={() => handleDecrement(item.name, item.quantity)}>-</button>
                    {item.quantity}
                    <button onClick={() => handleIncrement(item.name)}>+</button>
                  </td>
                  <td>${calculateTotalCost(item)}</td>
                  <td>
                    <button onClick={() => handleRemove(item.name)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Total Cost: ${calculateTotalAmount()}</h3>

          <button onClick={onContinueShopping}>Continue Shopping</button>
          <button onClick={handleCheckoutShopping}>Checkout</button>
        </>
      )}
    </div>
  );
};

export default CartItem;
