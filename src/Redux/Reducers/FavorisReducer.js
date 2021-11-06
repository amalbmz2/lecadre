import {
  ADD_TO_FAVORIS,
  GET_FROM_FAVORIS,
  GET_FAVORIS_ITEM,
  PATCH_FAVORIS_TAG
} from "../../Const/ActionType";

const initialState = {
  favoriteList: [],
  favoriteItem: {},
  tag: false,
};
export default function (state = initialState, action) {
  if (action.type === ADD_TO_FAVORIS) {
    return Object.assign({}, state, {
      favoriteList: state.favoriteList.concat(action.payload),
    });
  }
  if (action.type === GET_FROM_FAVORIS) {
    return Object.assign({}, state, {
      favoriteList: action.payload,
    });
  }
  if (action.type === GET_FAVORIS_ITEM) {
    return Object.assign({}, state, {
      favoriteItem: action.payload,
    });
  }
  if (action.type === PATCH_FAVORIS_TAG) {
    return Object.assign({}, state, {
    });
  }
 
  return state;
}
