import {
    GET_NB_ORDERS,
    SEND_ORDER,
    GET_ORDERS,
    PATCH_SHIPPING_STATUS,
    SHOW_ORDER_MESSAGE,
    HIDE_ORDER_Licence_MESSAGE,
    SHOW_ORDER_Licence_MESSAGE,
    HIDE_ORDER_MESSAGE
  } from "../../Const/ActionType";
  const initialState = {
    countorders:'',
    orderList:[],
    alertMessage: "",
    showMessage: false,
    loader: false,

};
export default function(state = initialState, action) {
   
    if (action.type === GET_NB_ORDERS) {
      return Object.assign({}, state, {
        countorders: action.payload,
      });
    }
      if (action.type === SEND_ORDER) {
        return Object.assign({}, state, {
          orderList: state.orderList.concat(action.payload),
        });
      }
      if (action.type === GET_ORDERS) {
        return Object.assign({}, state, {
          orderList: action.payload,
        });
      }

      if (action.type === PATCH_SHIPPING_STATUS) {
        return Object.assign({}, state, {
          
        });
      }
      if (action.type === SHOW_ORDER_MESSAGE) {
        return Object.assign({}, state, {
          alertMessage: action.payload,
          showMessage: true,
          loader: false,
        });
      }
    
      if (action.type === HIDE_ORDER_Licence_MESSAGE) {
        return Object.assign({}, state, {
          alertLicenceMessage: action.payload,
          showLicenceMessage: true,
        });
      }
      if (action.type === SHOW_ORDER_Licence_MESSAGE) {
        return Object.assign({}, state, {
          alertLicenceMessage: "",
          showLicenceMessage: false,
        });
      }
    
      if (action.type === HIDE_ORDER_MESSAGE) {
        return Object.assign({}, state, {
          alertMessage: "",
          showMessage: false,
          loader: false,
        });
      }

    return state;

}