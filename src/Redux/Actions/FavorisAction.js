import axios from "axios";
import {
  ADD_TO_FAVORIS,
  GET_PRODUCT,
  GET_FROM_FAVORIS,
  GET_FAVORIS_ITEM,
  ADD_ITEM_TO_CART,
  GET_ALL_PRODUCTS,
} from "../../Const/ActionType";
import baseUrl from "../../../src/config/config";

export function addToFavoris(id) {
  return (dispatch) => {
    axios.get(`${baseUrl.baseUrl}/list-products/` + id).then((res) => {
      dispatch({ type: GET_PRODUCT, payload: res.data });
      let favorisData = {
        productName: res.data.productName,
        price: Number(res.data.price),
        productImage: res.data.productImage,
        userId: res.data.userId,
      };
      axios
        .post(
          `${baseUrl.baseUrl}/users/` +
            localStorage.getItem("userId") +
            `/favorises`,
          favorisData
        )
        .then((response) => {
          dispatch({ type: ADD_TO_FAVORIS, payload: response.data });

          axios
            .get(
              `${baseUrl.baseUrl}/users/` +
                localStorage.getItem("userId") +
                `/favorises`
            )
            .then((resp) => {
              dispatch({
                type: GET_FROM_FAVORIS,
                payload: resp.data.reverse(),
              });
              axios.get(`${baseUrl.baseUrl}/list-products`).then((respo) => {
                dispatch({
                  type: GET_ALL_PRODUCTS,
                  payload: respo.data.reverse(),
                });

                let result = respo.data.filter((o1) =>
                  resp.data.some((o2) => o1.productName === o2.productName)
                );
                if (result.length !== 0) {
                  axios
                    .patch(
                      `${baseUrl.baseUrl}/list-products/` +
                        id +
                        `?access_token=${localStorage.token}`,
                      { FavorisTag: true }
                    )
                    .then((res) => {
                      //  dispatch({ type: PATCH_FAVORIS_TAG, payload: res.data });
                      axios
                        .get(`${baseUrl.baseUrl}/list-products`)
                        .then((respo) => {
                          dispatch({
                            type: GET_ALL_PRODUCTS,
                            payload: respo.data.reverse(),
                          });
                        });
                    });
                }
              });
            });
        });
    });
  };
}

export function getFavoriteList(id) {
  return function (dispatch) {
    axios.get(`${baseUrl.baseUrl}/users/` + id + `/favorises`).then((res) => {
      dispatch({ type: GET_FROM_FAVORIS, payload: res.data.reverse() });
    });
  };
}
export function deleteFromFavoris(id) {
  return (dispatch) => {
    axios
      .get(
        `${baseUrl.baseUrl}/users/${localStorage.getItem("userId")}/favorises`
      )
      .then((res) => {
        dispatch({ type: GET_FROM_FAVORIS, payload: res.data.reverse() });

        axios.get(`${baseUrl.baseUrl}/list-products`).then((respo) => {
          dispatch({ type: GET_ALL_PRODUCTS, payload: respo.data.reverse() });

          let deleteResult = respo.data.filter((o1) =>
            res.data.some(
              (o2) => o1.productName === o2.productName && o2.id === id
            )
          );

          deleteResult.map((element) =>
            axios
              .patch(
                `${baseUrl.baseUrl}/list-products/` +
                  element.id +
                  `?access_token=${localStorage.token}`,
                { FavorisTag: false }
              )

              .then((res) => {
                // dispatch({ type: PATCH_FAVORIS_TAG, payload: res.data });
                axios.get(`${baseUrl.baseUrl}/list-products`).then((res) => {
                  dispatch({
                    type: GET_ALL_PRODUCTS,
                    payload: res.data.reverse(),
                  });
                });
              })
          );
        });
      });

    axios
      .delete(
        `${baseUrl.baseUrl}/favorises/` +
          id +
          `?access_token=${localStorage.token}`
      )
      .then((response) => {
        axios
          .get(
            `${baseUrl.baseUrl}/users/${localStorage.getItem(
              "userId"
            )}/favorises`
          )
          .then((res) => {
            dispatch({ type: GET_FROM_FAVORIS, payload: res.data.reverse() });
          });
      })
      .catch(function (error) {});
  };
}

export function getFavorisItem(id) {
  return function (dispatch) {
    axios.get(`${baseUrl.baseUrl}/favorises/` + id).then((res) => {
      dispatch({ type: GET_FAVORIS_ITEM, payload: res.data });
    });
  };
}
export function addItemFromFavorisToCart(id) {
  return (dispatch) => {
    axios.get(`${baseUrl.baseUrl}/favorises/` + id).then((res) => {
      dispatch({ type: GET_FAVORIS_ITEM, payload: res.data });
      let itemData = {
        productName: res.data.productName,
        price: Number(res.data.price),
        productImage: res.data.productImage,
        userId: res.data.userId,
        quantity: 1,
      };
      axios
        .post(
          `${baseUrl.baseUrl}/users/` +
            localStorage.getItem("userId") +
            `/cart-items`,
          itemData
        )
        .then((response) => {
          dispatch({ type: ADD_ITEM_TO_CART, payload: response.data });
        });
    });
  };
}
