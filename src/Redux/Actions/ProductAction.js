import axios from "axios";
import {
  GET_ALL_PRODUCTS,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  ADD_PRODUCT,
  SHOW_MESSAGE,
  SHOW_Licence_MESSAGE,
  HIDE_Licence_MESSAGE,
  HIDE_MESSAGE,
  GET_PRODUCT,
  GET_CLASSIC_PRODUCTS,
  GET_MODERN_PRODUCTS,
  GET_WOOD_PRODUCTS,
  GET_CERAMIC_PRODUCTS,
  GET_NB_PRODUCTS,
  GET_NB_BEST_PRODUCTS,
  GET_NB_CERAMIC_PRODUCTS,
  GET_NB_WOOD_PRODUCTS,
  NB_WOOD_CLASSIC_PRODUCTS,
  NB_CERAMIC_MODERN_PRODUCTS,
  NB_WOOD_MODERN_PRODUCTS,
  NB_CEREMIC_CLASSIC_PRODUCTS,
  NB_WOOD_WOOD_PRODUCTS,
  NB_CERAMIC_WOOD_PRODUCTS,
  NB_WOOD_CERAMIC_PRODUCTS,
  NB_CERAMIC_CERAMIC_PRODUCTS,
  PATCH_LIST_PRODUCT,
  GET_BEST_SALES,
  DELETE_LIST_PRODUCT,
  GET_FROM_FAVORIS,
} from "../../Const/ActionType";
import baseUrl from "../../../src/config/config";

export function getProducts() {
  return function (dispatch) {
    axios.get(`${baseUrl.baseUrl}/list-products`).then((res) => {
      dispatch({ type: GET_ALL_PRODUCTS, payload: res.data.reverse() });
      axios
        .get(
          `${baseUrl.baseUrl}/users/` +
            localStorage.getItem("userId") +
            `/favorises`
        )
        .then((resp) => {
          dispatch({ type: GET_FROM_FAVORIS, payload: resp.data.reverse() });

          let result = res.data.filter((o1) =>
            resp.data.some((o2) => o1.productName === o2.productName)
          );
          result.map((element) =>
            axios
              .patch(
                `${baseUrl.baseUrl}/list-products/` +
                  element.id +
                  `?access_token=${localStorage.token}`,
                { FavorisTag: true }
              )
              .then((respo) => {
                //  dispatch({ type: PATCH_FAVORIS_TAG, payload: res.data });
                axios.get(`${baseUrl.baseUrl}/list-products`).then((res) => {
                  dispatch({
                    type: GET_ALL_PRODUCTS,
                    payload: res.data.reverse(),
                  });
                });
              })
          );

          let result2 = res.data.filter((e1) =>
            result.some((e2) => e1.id !== e2.id)
          );


          result2.map((element) =>
            axios
              .patch(
                `${baseUrl.baseUrl}/list-products/` +
                  element.id +
                  `?access_token=${localStorage.token}`,
                { FavorisTag: false }
              )
              .then((respo) => {
                //  dispatch({ type: PATCH_FAVORIS_TAG, payload: res.data });
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
  };
}

export function deleteProduct(id) {
  return (dispatch) => {
    axios
      .delete(
        `${baseUrl.baseUrl}/list-products/` +
          id +
          `?access_token=${localStorage.token}`
      )
      .then((response) => {
        dispatch({ type: DELETE_PRODUCT, payload: response.data });
        dispatch(showProductMessage("Votre produit est supprimé"));
        axios.get(`${baseUrl.baseUrl}/list-products`).then((res) => {
          dispatch({ type: GET_ALL_PRODUCTS, payload: res.data.reverse() });
        });
      })
      .catch(function (error) {});
  };
}

export function editProduct(data) {
  return (dispatch) => {
    let productData = {
      productName: data.productName,
      selectedOption: data.selectedOption,
      price: Number(data.price),
      materialOption: data.materialOption,
      color: data.color,
      size: data.size,
      productImage: data.productImage,
      id: data.id,
    };
    let apiEndpoint =
      `${baseUrl.baseUrl}/list-products/` +
      data.id +
      `?access_token=${localStorage.token}`;
    axios
      .put(apiEndpoint, productData)
      .then((response) => {
        dispatch({ type: EDIT_PRODUCT, payload: response.data });
        dispatch(showProductMessage("Votre produit est à jour"));
        axios.get(`${baseUrl.baseUrl}/list-products`).then((res) => {
          dispatch({ type: GET_ALL_PRODUCTS, payload: res.data.reverse() });
        });
      })
      .catch((error) => {});
  };
}

export function addproduct(data) {
  return (dispatch) => {
    let productData = {
      productName: data.productName,
      selectedOption: data.selectedOption,
      price: Number(data.price),
      materialOption: data.materialOption,
      color: data.color,
      size: data.size,
      productImage: data.productImage,
      id: data.id,
    };
    axios
      .post(
        `${baseUrl.baseUrl}/list-products?access_token=${localStorage.token}`,
        productData
      )
      .then((res) => {
        dispatch({ type: ADD_PRODUCT, payload: res.data });

        axios.get(`${baseUrl.baseUrl}/list-products`).then((res) => {
          dispatch({ type: GET_ALL_PRODUCTS, payload: res.data.reverse() });

          dispatch(showProductMessage("Votre nouveau produit est ajouté"));
        });
        axios.post(`${baseUrl.baseUrl}/notif`, {}).then((res) => {});
      })
      .catch((err) => {});
  };
}

export function getProduct(id) {
  return function (dispatch) {
    axios.get(`${baseUrl.baseUrl}/list-products/` + id).then((res) => {
      dispatch({ type: GET_PRODUCT, payload: res.data });
    });
  };
}

export function getClassicProducts() {
  return function (dispatch) {
    axios.get(`${baseUrl.baseUrl}/list-products`).then((res) => {
      const classicList = res.data.filter(
        (element) => element.selectedOption === "Classique"
      );
      dispatch({ type: GET_CLASSIC_PRODUCTS, payload: classicList.reverse() });
    });
  };
}

export function getModernProducts() {
  return function (dispatch) {
    axios.get(`${baseUrl.baseUrl}/list-products`).then((res) => {
      const modernList = res.data.filter(
        (element) => element.selectedOption === "Moderne"
      );
      dispatch({ type: GET_MODERN_PRODUCTS, payload: modernList.reverse() });
    });
  };
}
export function getWoodProducts() {
  return function (dispatch) {
    axios.get(`${baseUrl.baseUrl}/list-products`).then((res) => {
      const woodList = res.data.filter(
        (element) => element.selectedOption === "Cadre en bois"
      );
      dispatch({ type: GET_WOOD_PRODUCTS, payload: woodList.reverse() });
    });
  };
}
export function getCeramicProducts() {
  return function (dispatch) {
    axios.get(`${baseUrl.baseUrl}/list-products`).then((res) => {
      const ceramicList = res.data.filter(
        (element) => element.selectedOption === "Cadre en céramique"
      );
      dispatch({ type: GET_CERAMIC_PRODUCTS, payload: ceramicList.reverse() });
    });
  };
}
export function patchBestSales(id) {
  return function (dispatch) {
    axios
      .patch(
        `${baseUrl.baseUrl}/list-products/` +
          id +
          `?access_token=${localStorage.token}`,
        { tag: true }
      )
      .then((res) => {
        dispatch({ type: PATCH_LIST_PRODUCT, payload: res.data });
        dispatch(
          showProductMessage(
            "Votre produit est ajouté à la liste des meilleurs ventes"
          )
        );
        axios.get(`${baseUrl.baseUrl}/list-products`).then((res) => {
          dispatch({ type: GET_ALL_PRODUCTS, payload: res.data.reverse() });
        });
      });
  };
}
export function deleteBestSales(id) {
  return function (dispatch) {
    axios
      .patch(
        `${baseUrl.baseUrl}/list-products/` +
          id +
          `?access_token=${localStorage.token}`,
        { tag: false }
      )
      .then((res) => {
        dispatch({ type: DELETE_LIST_PRODUCT, payload: res.data });
        dispatch(
          showProductMessage(
            "Votre produit est supprimé de la liste des meilleurs ventes"
          )
        );
        axios.get(`${baseUrl.baseUrl}/list-products`).then((res) => {
          dispatch({ type: GET_ALL_PRODUCTS, payload: res.data.reverse() });
        });
      });
  };
}
export function getbestSales() {
  return function (dispatch) {
    axios.get(`${baseUrl.baseUrl}/list-products`).then((res) => {
      const bestSales = res.data.filter((element) => element.tag === true);
      dispatch({ type: GET_BEST_SALES, payload: bestSales.reverse() });
    });
  };
}

///statistics
export function getNbProducts() {
  return function (dispatch) {
    axios
      .get(
        `${baseUrl.baseUrl}/list-products/count?access_token=${localStorage.token}`
      )
      .then((res) => {
        dispatch({ type: GET_NB_PRODUCTS, payload: res.data.count });
      });
  };
}
export function getNbBestProducts() {
  return function (dispatch) {
    axios
      .get(
        `${baseUrl.baseUrl}/list-products/count/BestSales?access_token=${localStorage.token}`
      )
      .then((res) => {
        dispatch({ type: GET_NB_BEST_PRODUCTS, payload: res.data.count });
      });
  };
}
export function getNbCeramicProducts() {
  return function (dispatch) {
    axios
      .get(
        `${baseUrl.baseUrl}/list-products/count/Ceramic?access_token=${localStorage.token}`
      )
      .then((res) => {
        dispatch({ type: GET_NB_CERAMIC_PRODUCTS, payload: res.data.count });
      });
  };
}

export function getNbWoodProducts() {
  return function (dispatch) {
    axios
      .get(
        `${baseUrl.baseUrl}/list-products/count/Wood?access_token=${localStorage.token}`
      )
      .then((res) => {
        dispatch({ type: GET_NB_WOOD_PRODUCTS, payload: res.data.count });
      });
  };
}

export function getNbWoodClassicProducts() {
  return function (dispatch) {
    axios
      .get(
        `${baseUrl.baseUrl}/list-products/count/WoodClassic?access_token=${localStorage.token}`
      )
      .then((res) => {
        dispatch({ type: NB_WOOD_CLASSIC_PRODUCTS, payload: res.data.count });
      });
  };
}
export function getNbCeramicClassicProducts() {
  return function (dispatch) {
    axios
      .get(
        `${baseUrl.baseUrl}/list-products/count/CeramicModern?access_token=${localStorage.token}`
      )
      .then((res) => {
        dispatch({ type: NB_CERAMIC_MODERN_PRODUCTS, payload: res.data.count });
      });
  };
}

export function getNbWoodModernProducts() {
  return function (dispatch) {
    axios
      .get(
        `${baseUrl.baseUrl}/list-products/count/WoodModern?access_token=${localStorage.token}`
      )
      .then((res) => {
        dispatch({ type: NB_WOOD_MODERN_PRODUCTS, payload: res.data.count });
      });
  };
}
export function getNbCeramicClassiwProducts() {
  return function (dispatch) {
    axios
      .get(
        `${baseUrl.baseUrl}/list-products/count/CeramicClassic?access_token=${localStorage.token}`
      )
      .then((res) => {
        dispatch({
          type: NB_CEREMIC_CLASSIC_PRODUCTS,
          payload: res.data.count,
        });
      });
  };
}

export function getNbWoodWoodProducts() {
  return function (dispatch) {
    axios
      .get(
        `${baseUrl.baseUrl}/list-products/count/WoodWood?access_token=${localStorage.token}`
      )
      .then((res) => {
        dispatch({ type: NB_WOOD_WOOD_PRODUCTS, payload: res.data.count });
      });
  };
}

export function getNbCeramicWoodProducts() {
  return function (dispatch) {
    axios
      .get(
        `${baseUrl.baseUrl}/list-products/count/CeramicWood?access_token=${localStorage.token}`
      )
      .then((res) => {
        dispatch({ type: NB_CERAMIC_WOOD_PRODUCTS, payload: res.data.count });
      });
  };
}
export function getNbWoodCeramicProducts() {
  return function (dispatch) {
    axios
      .get(
        `${baseUrl.baseUrl}/list-products/count/WoodCeramic?access_token=${localStorage.token}`
      )
      .then((res) => {
        dispatch({ type: NB_WOOD_CERAMIC_PRODUCTS, payload: res.data.count });
      });
  };
}
export function getNbCeramiCeramicProducts() {
  return function (dispatch) {
    axios
      .get(
        `${baseUrl.baseUrl}/list-products/count/CeramicCeramic?access_token=${localStorage.token}`
      )
      .then((res) => {
        dispatch({
          type: NB_CERAMIC_CERAMIC_PRODUCTS,
          payload: res.data.count,
        });
      });
  };
}

/////alert
export const showProductMessage = (message) => {
  return {
    type: SHOW_MESSAGE,
    payload: message,
  };
};

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE,
  };
};
export const showLicenceMessage = (message) => {
  return {
    type: SHOW_Licence_MESSAGE,
    payload: message,
  };
};
export const hideLicenceMessage = (message) => {
  return {
    type: HIDE_Licence_MESSAGE,
  };
};
