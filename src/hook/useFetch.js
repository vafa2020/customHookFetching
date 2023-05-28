import axios from "axios";
import { useEffect } from "react";
import { useReducer } from "react";

const initialState = {
  loading: false,
  error: null,
  data: null,
};
export const actionType = {
  actionRequest: "FETCH_REQUEST",
  actionSuccess: "FETCH_SUCCESS",
  actionFailure: "FETCH_FAILURE",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.actionRequest:
      return { ...state, loading: true, error: null, data: null };
    case actionType.actionSuccess:
      return { ...state, loading: false, error: null, data: action.payload };
    case actionType.actionFailure:
      return { ...state, loading: false, error: action.payload, data: null };
    default:
      return state;
  }
};
const useFetch = (url) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: actionType.actionRequest });
    fetch(url);
  }, [url]);

  const fetch = async (url) => {
    try {
      const data = await axios.get(url);
      dispatch({ type: actionType.actionSuccess, payload: data.data });
    } catch (error) {
      dispatch({ type: actionType.actionFailure, payload: error.message });
    }
  };
  return state;
};

export default useFetch;
