import { combineReducers } from "redux";
import { productReducer } from "./product";
import { billReducer } from "./bill";

const RootReducer = combineReducers({
  product: productReducer,
  bill: billReducer,
});

export default RootReducer;
