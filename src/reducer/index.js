import { combineReducers } from "redux";
import { productReducer } from "./product";

const RootReducer = combineReducers({
  product: productReducer,
});

export default RootReducer;
