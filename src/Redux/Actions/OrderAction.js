import axios from "axios";
import {
  GET_NB_ORDERS,
  SEND_ORDER,
  GET_ORDERS,
  PATCH_SHIPPING_STATUS,
  SHOW_ORDER_MESSAGE,
  HIDE_ORDER_MESSAGE,
  SHOW_ORDER_Licence_MESSAGE,
  HIDE_ORDER_Licence_MESSAGE,
  GET_FROM_CART,
} from "../../Const/ActionType";
import baseUrl from "../../../src/config/config";

export function getNbOrders() {
  return function (dispatch) {
    axios
      .get(`${baseUrl.baseUrl}/orders/count?access_token=${localStorage.token}`)
      .then((res) => {
        dispatch({ type: GET_NB_ORDERS, payload: res.data.count });
      });
  };
}

export function sendOrder(data) {
  return (dispatch) => {
    let orderData = {
      firstName: data.firstName,
      lastName: data.lastName,
      adress: data.adress,
      livred: data.livred,
      tel: Number(data.tel),
      products: data.products,
    };
    axios
      .post(
        `${baseUrl.baseUrl}/orders?access_token=${localStorage.token}`,
        orderData
      )
      .then((res) => {
        dispatch({ type: SEND_ORDER, payload: res.data });

        axios
          .delete(
            `${baseUrl.baseUrl}/users/${localStorage.getItem(
              "userId"
            )}/cart-items`
          )
          .then((res) => {
            axios
              .get(
                `${baseUrl.baseUrl}/users/${localStorage.getItem(
                  "userId"
                )}/cart-items`
              )
              .then((res) => {
                dispatch({ type: GET_FROM_CART, payload: res.data.reverse() });
              });
          });
        axios.post(`${baseUrl.baseUrl}/notif-admin`, {}).then((res) => {});
      })
      .catch((err) => {});
  };
}

export function getOrders() {
  return function (dispatch) {
    axios.get(`${baseUrl.baseUrl}/orders`).then((res) => {
      dispatch({ type: GET_ORDERS, payload: res.data.reverse() });
    });
  };
}

export function patchShippingStatus(id) {
  return function (dispatch) {
    axios
      .patch(
        `${baseUrl.baseUrl}/orders/` +
          id +
          `?access_token=${localStorage.token}`,
        { livred: true }
      )
      .then((res) => {
        dispatch({ type: PATCH_SHIPPING_STATUS, payload: res.data });
        dispatch(
          showOrderMessage("Le status de livraison de ce produit a été modifié")
        );
        axios.get(`${baseUrl.baseUrl}/orders`).then((res) => {
          dispatch({ type: GET_ORDERS, payload: res.data.reverse() });
        });
      });
  };
}

export const showOrderMessage = (message) => {
  return {
    type: SHOW_ORDER_MESSAGE,
    payload: message,
  };
};
export const hideOrderMessage = () => {
  return {
    type: HIDE_ORDER_MESSAGE,
  };
};
export const showOrderLicenceMessage = (message) => {
  return {
    type: SHOW_ORDER_Licence_MESSAGE,
    payload: message,
  };
};
export const hideOrderLicenceMessage = (message) => {
  return {
    type: HIDE_ORDER_Licence_MESSAGE,
  };
};
