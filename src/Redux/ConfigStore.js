import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import UserManagementReducer from "../Redux/Reducers/UserManagementReducer";
import AuthReducer from "../Redux/Reducers/AuthReducer";
import ProductReducer from "../Redux/Reducers/ProductReducer";
import ClientManagementReducer from "../Redux/Reducers/ClientManagementReducer";
import OrderReducer from "../Redux/Reducers/OrderReducer";
import CartReducer from "../Redux/Reducers/CartReducer";
import FavorisReducer from "../Redux/Reducers/FavorisReducer";

const rootReducer = combineReducers({
  UserManagementReducer,
  AuthReducer,
  ProductReducer,
  ClientManagementReducer,
  OrderReducer,
  CartReducer,
  FavorisReducer

});
const configStore = () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};
export default configStore;
