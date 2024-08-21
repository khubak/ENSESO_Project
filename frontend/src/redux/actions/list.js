import getAll from "../../api/getAll";
import del from "../../api/del";

export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const DELETE_ITEM_SUCCESS = "DELETE_ITEM_SUCCESS";

export const fetchData = () => async (dispatch) => {
  try {
    const response = await getAll();
    const data = response.data;

    dispatch({ type: FETCH_DATA_SUCCESS, payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const deleteItem = (params) => async (dispatch) => {
  try {
    await del(params.EO_ID, params);
    dispatch({ type: DELETE_ITEM_SUCCESS, payload: params.EO_ID });
  } catch (error) {
    console.error(error);
  }
};
