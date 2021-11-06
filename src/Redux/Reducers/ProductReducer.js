import {
  GET_ALL_PRODUCTS,
  GET_CERAMIC_PRODUCTS,
  GET_WOOD_PRODUCTS,
  GET_CLASSIC_PRODUCTS,
  GET_MODERN_PRODUCTS,
  GET_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  ADD_PRODUCT,
  SHOW_MESSAGE,
  SHOW_Licence_MESSAGE,
  HIDE_Licence_MESSAGE,
  HIDE_MESSAGE,
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
  DELETE_LIST_PRODUCT
} from "../../Const/ActionType";
const initialState = {
  listProducts: [],
  alertMessage: "",
  showMessage: false,
  loader: false,
  showLicenceMessage: false,
  alertLicenceMessage: "",
  listproduct: {},
  classicList: [],
  modernList: [],
  woodList: [],
  ceramicList: [],
  countproducts: '',
  countbestProducts: '',
  countceramicProducts:'',
  countwoodProducts:'',
  countwoodclassicProducts:'',
  countceramicclassicProducts:'',
  countwoodmodernProducts:'',
  countclassicmodernProducts:'',
  countwoodwoodProducts:'',
  countceramicwoodProducts:'',
  countwoodceramicProducts:'',
  countceramicceramicProducts:'',
  listbestsales:[],
  
};

export default function (state = initialState, action) {
  

  if (action.type === DELETE_LIST_PRODUCT) {
    return Object.assign({}, state, {
      
    });
  }
 
  if (action.type === GET_BEST_SALES) {
    return Object.assign({}, state, {
      listbestsales: action.payload,
    });
  }
 
  if (action.type === PATCH_LIST_PRODUCT) {
    return Object.assign({}, state, {
      
    });
  }
  if (action.type === GET_PRODUCT) {
    return Object.assign({}, state, {
      listproduct: action.payload,
    });
  }
  if (action.type === GET_CLASSIC_PRODUCTS) {
    return Object.assign({}, state, {
      classicList: action.payload,
    });
  }
  if (action.type === GET_MODERN_PRODUCTS) {
    return Object.assign({}, state, {
      modernList: action.payload,
    });
  }
  if (action.type === GET_WOOD_PRODUCTS) {
    return Object.assign({}, state, {
      woodList: action.payload,
    });
  }
  if (action.type === GET_CERAMIC_PRODUCTS) {
    return Object.assign({}, state, {
      ceramicList: action.payload,
    });
  }

  if (action.type === GET_ALL_PRODUCTS) {
    return Object.assign({}, state, {
      listProducts: action.payload,
    });
  }
  if (action.type === DELETE_PRODUCT) {
    return Object.assign({}, state, {
      listProducts: [
        ...state.listProducts.filter(
          (element) => element.id !== action.payload.id
        ),
      ],
    });
  }

  if (action.type === EDIT_PRODUCT) {
    return Object.assign({}, state, {
      listProducts: [
        ...state.listProducts.filter(
          (element) => element.id !== action.payload.id
        ),
        action.payload,
      ],
    });
  }

  ///Statistics
  if (action.type === GET_NB_PRODUCTS) {
    return Object.assign({}, state, {
      countproducts: action.payload,
    });
  }

  if (action.type === GET_NB_BEST_PRODUCTS) {
    return Object.assign({}, state, {
      countbestProducts: action.payload,
    });
  }
  if (action.type === GET_NB_CERAMIC_PRODUCTS) {
    return Object.assign({}, state, {
      countceramicProducts: action.payload,
    });
  }
  if (action.type === GET_NB_WOOD_PRODUCTS) {
    return Object.assign({}, state, {
      countwoodProducts: action.payload,
    });
  }
  if (action.type === NB_WOOD_CLASSIC_PRODUCTS) {
    return Object.assign({}, state, {
      countwoodclassicProducts: action.payload,
    });
  }
  if (action.type === NB_CERAMIC_MODERN_PRODUCTS) {
    return Object.assign({}, state, {
      countceramicmodernProducts: action.payload,
    });
  } 
  
  if (action.type === NB_WOOD_MODERN_PRODUCTS) {
    return Object.assign({}, state, {
      countwoodmodernProducts: action.payload,
    });
  } 

  if (action.type === NB_CEREMIC_CLASSIC_PRODUCTS) {
    return Object.assign({}, state, {
      countceramicclassicProducts: action.payload,
    });
  } 
  if (action.type === NB_WOOD_WOOD_PRODUCTS) {
    return Object.assign({}, state, {
      countwoodwoodProducts: action.payload,
    });
  }
   
  if (action.type === NB_CERAMIC_WOOD_PRODUCTS) {
    return Object.assign({}, state, {
      countceramicwoodProducts: action.payload,
    });
  }
  if (action.type === NB_WOOD_CERAMIC_PRODUCTS) {
    return Object.assign({}, state, {
      countwoodceramicProducts: action.payload,
    });
  }
  if (action.type === NB_CERAMIC_CERAMIC_PRODUCTS) {
    return Object.assign({}, state, {
      countceramicceramicProducts: action.payload,
    });
  }
  
  //ADD_PRODUCT
  if (action.type === ADD_PRODUCT) {
    return Object.assign({}, state, {
    });
  }
  ///alert
  if (action.type === SHOW_MESSAGE) {
    return Object.assign({}, state, {
      alertMessage: action.payload,
      showMessage: true,
      loader: false,
    });
  }

  if (action.type === SHOW_Licence_MESSAGE) {
    return Object.assign({}, state, {
      alertLicenceMessage: action.payload,
      showLicenceMessage: true,
    });
  }
  if (action.type === HIDE_Licence_MESSAGE) {
    return Object.assign({}, state, {
      alertLicenceMessage: "",
      showLicenceMessage: false,
    });
  }

  if (action.type === HIDE_MESSAGE) {
    return Object.assign({}, state, {
      alertMessage: "",
      showMessage: false,
      loader: false,
    });
  }

  return state;
}
