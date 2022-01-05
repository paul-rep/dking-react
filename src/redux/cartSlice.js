import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const cartSlice = createSlice({
name:"cart",
initialState: {
    products: [],
    quantity: 0,
    total: 0
},
reducers: {
    addProduct(state,action){
        console.log(action.payload);
        console.log(action.payload.quantity);
        console.log(action.payload.price);

        if (!state.products.some(p => p._id === action.payload._id)){
            console.log(true);
            state.products.push(action.payload);
            state.quantity += action.payload.quantity;
            state.total += (action.payload.price * action.payload.quantity);
        }  else {
            const product = state.products.find(p => p._id === action.payload._id)
            product.quantity += action.payload.quantity
            state.quantity += action.payload.quantity;
            state.total += (action.payload.price * action.payload.quantity);
        }
        
    },
    removeProduct(state, action){
        if (state.products.some(p => p._id === action.payload._id)){
            const product = state.products.find((p) => p._id === action.payload._id);
            const index = state.products.indexOf(product);
    
            product.quantity -= 1;
            state.quantity -= 1;
            state.total -= action.payload.price;
            if(product.quantity === 0){
                const spliced = state.products.splice(index,1);
            }
            console.log(state.products.some(p => p._id === action.payload._id));
        }
        
    },
    clearCart(state, action){
        state.products = [];
        state.total = 0;
        state.quantity = 0;
    }
}
})

export const { addProduct,removeProduct,clearCart } = cartSlice.actions;
export default cartSlice.reducer;