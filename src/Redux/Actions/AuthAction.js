import axios from "axios";
import {
  AUTH_USER,
  SHOW_MESSAGE,
  HIDE_MESSAGE,
  LOGOUT_USER,
  SHOW_Licence_MESSAGE,
  HIDE_Licence_MESSAGE,
  ON_SHOW_LOADER,
} from "../../Const/ActionType";
import baseUrl from '../../../src/config/config';

export function AuthUser(data) {
  return (dispatch) => {
    axios
      .post(`${baseUrl.baseUrl}/users/login`,data)
      .then((res) => {
        localStorage.setItem("token", res.data.generatedToken.id);
        localStorage.setItem("userId", res.data.generatedToken.userId);
        dispatch({ type: AUTH_USER, payload: res.data });
      })
      .catch((err) =>
        dispatch(showAuthMessage("Adresse e-mail ou mot de passe invalide"))
      );
  };
}

export function LogoutUser() {
  return async (dispatch) => {
    await localStorage.removeItem("token");
    await localStorage.removeItem("userId");
    dispatch({ type: LOGOUT_USER, payload: false });
  };
}
export const showAuthMessage = (message) => {
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
export const showAuthLoader = () => {
  return {
    type: ON_SHOW_LOADER,
  };
};
