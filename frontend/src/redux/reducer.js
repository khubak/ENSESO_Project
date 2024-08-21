import { FETCH_DATA_SUCCESS, DELETE_ITEM_SUCCESS } from "./actions/list";

const initialState = {
  list: [],
  item: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return { ...state, list: action.payload };
    case DELETE_ITEM_SUCCESS:
      return {
        ...state,
        list: state.list.filter((item) => item.EO_ID !== action.payload),
      };
    default:
      return state;
  }
};

export default reducer;