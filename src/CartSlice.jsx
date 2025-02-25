import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Initial cart state is an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.name === newItem.name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
    },

    removeItem: (state, action) => {
      const itemName = action.payload;
      state.items = state.items.filter((item) => item.name !== itemName);
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);

      if (existingItem) {
        existingItem.quantity = Math.max(1, quantity);
      }
    },

    // ✅ **Add incrementQuantity**
    incrementQuantity: (state, action) => {
      const existingItem = state.items.find((item) => item.name === action.payload.name);
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },

    // ✅ **Add decrementQuantity**
    decrementQuantity: (state, action) => {
      const existingItem = state.items.find((item) => item.name === action.payload.name);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
    },
  },
});

// ✅ Export all actions (now correctly defined)
export const { addItem, removeItem, incrementQuantity, decrementQuantity } = cartSlice.actions;

// ✅ Default export the reducer
export default cartSlice.reducer;
