import {
  AUTH_USER,
  LOGOUT_USER,
  SHOW_MESSAGE,
  SHOW_Licence_MESSAGE,
  HIDE_Licence_MESSAGE,
  ON_SHOW_LOADER,
  HIDE_MESSAGE,
  } from "../../Const/ActionType";
  const initialState = {
    AuthUser: {},
    authUser: localStorage.getItem("token"),
    LoginError:"",
   authToken:'',
    CheckauthUser: false,
    alertMessage: "",
    showMessage: false,
    loader: false,
    showLicenceMessage: false,
    alertLicenceMessage: "",
    user_role:"",
    userId:""

  


  };
  const AuthReducer = (state = initialState, action) => {
    if (action.type === AUTH_USER) {

      return Object.assign({}, state, {
        AuthUser: action.payload,
        authToken: action.payload.id,
        CheckauthUser: true,
       authUser:action.payload.id,
       userId:action.payload.generatedToken.userId,
      user_role: action.payload.roles[0]
  
      });
     

    }
    if (action.type === LOGOUT_USER) {

      return Object.assign({}, state, {
        AuthUser: {},
    CheckauthUser: false,
    authUser:null
      });
    }
   
    
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
    if (action.type === ON_SHOW_LOADER) {
      return Object.assign({}, state, {
        loader: true,
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
  };
  
  export default AuthReducer;
