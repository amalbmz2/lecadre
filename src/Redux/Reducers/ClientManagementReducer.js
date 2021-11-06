import {
    GET_CLIENTS,GET_NB_CLIENTS,GET_CLIENT
  } from "../../Const/ActionType";
  const initialState = {
    listClients: [],
    countclients:'',
    client:{}

};
export default function(state = initialState, action) {
    if (action.type === GET_CLIENTS) {
      return Object.assign({}, state, {
        listClients: action.payload,
      });
    }

    if (action.type === GET_NB_CLIENTS) {
      return Object.assign({}, state, {
        countclients: action.payload,
      });
    }
    if (action.type === GET_CLIENT) {
      return Object.assign({}, state, {
        client: action.payload,
      });
    }
    

    return state;

}