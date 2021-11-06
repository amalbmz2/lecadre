import axios from "axios";
import {
  ADD_TO_CART,
  GET_FROM_CART,
  GET_CART_ITEM,
  GET_PRODUCT,
  ADD_ITEM_TO_CART
} from "../../Const/ActionType";
import baseUrl from '../../../src/config/config';


export function addToCart(data) {
  return (dispatch) => {
    let cartData = {
      productName: data.productName,
      price: Number(data.price),
      productImage: data.productImage,
      userId: data.userId,
    };
    axios
      .post(
        `${baseUrl.baseUrl}/users/` + data.userId + `/cart-items`,
        cartData
      )
      .then((res) => {
        dispatch({ type: ADD_TO_CART, payload: res.data });
      })
      .catch((err) => {});
  };
}

export function getCartList(id) {
  return function (dispatch) {
    axios
      .get(`${baseUrl.baseUrl}/users/`+id+`/cart-items`)
      .then((res) => {
        dispatch({ type: GET_FROM_CART, payload: res.data.reverse() });
      });
  };
}

export function deleteFromCart(id) {
  return (dispatch) => {
    axios
      .delete(
        `${baseUrl.baseUrl}/cart-items/` +
          id +
          `?access_token=${localStorage.token}`
      )
      .then((response) => {
        axios.get(`${baseUrl.baseUrl}/users/${localStorage.getItem("userId")}/cart-items`).then((res) => {
          dispatch({ type: GET_FROM_CART, payload: res.data.reverse() });
          
        })

      })
      .catch(function (error) {});
  };
}

export function getCartItem(id) {
  return function (dispatch) {
    axios.get(`${baseUrl.baseUrl}/cart-items/`+id).then((res) => {
      dispatch({ type: GET_CART_ITEM, payload: res.data });
    });
  };
}

export function addItemToCart(id) {
  return (dispatch) => {
    axios.get(`${baseUrl.baseUrl}/list-products/` + id).then((res) => {
      dispatch({ type: GET_PRODUCT, payload: res.data });
      let itemData = {
        productName: res.data.productName,
        price: Number(res.data.price),
        productImage: res.data.productImage,
        userId: res.data.userId,
        quantity:1
      };
      axios.post(
        `${baseUrl.baseUrl}/users/` +
          localStorage.getItem("userId") +
          `/cart-items`,
          itemData
      ).then((response) => {
        dispatch({ type: ADD_ITEM_TO_CART, payload: response.data });

      });
    });
  };
}