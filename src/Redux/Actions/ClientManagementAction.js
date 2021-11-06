import axios from "axios";
import {
    GET_CLIENTS,
    GET_NB_CLIENTS,
    GET_CLIENT
  } from "../../Const/ActionType";
  import baseUrl from '../../../src/config/config';


  export function getclients() {
    return function (dispatch) {
      axios
        .get(
          `${baseUrl.baseUrl}/users?access_token=${localStorage.token}`
        )
        .then((res) => {
          dispatch({ type: GET_CLIENTS, payload: res.data.reverse() });
        });
    };
  }
  export function getNbclients(){
    return function(dispatch){
      axios
      .get(`${baseUrl.baseUrl}/users/count?access_token=${localStorage.token}`)
      .then((res) => {
        dispatch({ type: GET_NB_CLIENTS, payload: res.data.count });
        
      });
    };
  }

  export function getClientById(id) {
    return function (dispatch) {
      axios.get(`${baseUrl.baseUrl}/users/` + id).then((res) => {
        dispatch({ type: GET_CLIENT, payload: res.data });
      });
    };
  }