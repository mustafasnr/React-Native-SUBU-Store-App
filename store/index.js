import {configureStore, combineReducers} from '@reduxjs/toolkit';
import cart from "./cart"
const reducer = combineReducers({
  cartReduce:cart,
});
const store = configureStore({
  reducer: reducer,
});

export default store;
