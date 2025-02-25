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
  },
});

export const { addItem, removeItem, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;

