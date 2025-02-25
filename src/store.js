import cartReducer from "./CartSlice";
console.log("CartReducer loaded:", cartReducer);

import { configureStore } from '@reduxjs/toolkit';
 const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});
export default store
