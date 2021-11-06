import {
  ADD_TO_CART,
  GET_FROM_CART,
  GET_CART_ITEM,
  ADD_ITEM_TO_CART,
} from "../../Const/ActionType";

const initialState = {
  cartList: [],
  cartItem: {},
};
export default function (state = initialState, action) {
  if (action.type === ADD_TO_CART) {
    return Object.assign({}, state, {
      cartList: state.cartList.concat(action.payload),
    });
  }

  if (action.type === GET_FROM_CART) {
    return Object.assign({}, state, {
      cartList: action.payload,
    });
  }
  if (action.type === GET_CART_ITEM) {
    return Object.assign({}, state, {
      cartItem: action.payload,
    });
  }
  if (action.type === ADD_ITEM_TO_CART) {
    return Object.assign({}, state, {
      cartList: state.cartList.concat(action.payload),
    });
  }
 
  return state;
}
