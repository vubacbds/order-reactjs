import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import RootReducer from "./reducer";

const store = createStore(RootReducer, applyMiddleware(thunk));

//Khi store thay đổi thì hàm subscribe chạy: store.subscribe(() => {});

export default store;
