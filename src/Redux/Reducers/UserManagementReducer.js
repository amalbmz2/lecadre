import {
    FETECHED_USER,
    ADD_USER,
    EDIT_USER,
    DELETE_USER_MESSAGE,
  } from "../../Const/ActionType";
  const initialState = {
    UserList: [],
  };
  const UserManagementReducer = (state = initialState, action) => {
    if (action.type === FETECHED_USER) {
      return Object.assign({}, state, {
        UserList: action.payload,
      });
    }
    if (action.type === ADD_USER) {
      return Object.assign({}, state, {
        UserList: action.payload,
      });
    }
  
    if (action.type === EDIT_USER) {
      return Object.assign({}, state, {
        UserList: action.payload,
      });
    }
  
    if (action.type === DELETE_USER_MESSAGE) {
      return Object.assign({}, state, {
        UserList: action.payload,
      });
    }
  
    return state;
  };
  
  export default UserManagementReducer;
  
