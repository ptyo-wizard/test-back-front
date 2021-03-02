import axios from "axios";

export const FETCH_SELL_ORDER_REQUEST = "FETCH_SELL_ORDERS_REQUEST";
export const FETCH_SELL_ORDER_SUCCES = "FETCH_SELL_ORDERS_SUCCES";
export const FETCH_SELL_ORDER_FAILURE = "FETCH_SELL_ORDERS_FAILURE";

export const GET_INIT_METHODS_SUCCES = "GET_INIT_METHODS_SUCCES";
export const GET_INIT_METHODS_REQUEST = "GET_INIT_METHODS_REQUEST";
export const GET_INIT_METHODS_FAILURE = "GET_INIT_METHODS_FAILURE";

export const ADD_SELL_ORDER_LIST = "ADD_SELL_ORDERS_LIST";

export const SET_ID_SELL_ORDER_FOCUS = "SET_ID_SELL_ORDER_FOCUS";

//console.log("env ",process.env.REACT_APP_ENV)
export const setIdSellOrderFocus = (id) => {
  return {
    type: SET_ID_SELL_ORDER_FOCUS,
    payload: id,
  };
};

export const addSellOrderList = (data) => {
  return {
    type: ADD_SELL_ORDER_LIST,
    payload: data,
  };
};

export const fetchSellOrderRequest = () => {
  return {
    type: FETCH_SELL_ORDER_REQUEST,
  };
};

export const fetchSellOrderSucces = (data) => {
  return {
    type: FETCH_SELL_ORDER_SUCCES,
    payload: data,
  };
};

export const fetchSellOrderFailure = (error) => {
  return {
    type: FETCH_SELL_ORDER_FAILURE,
    payload: error,
  };
};

export const getInitMethodsSucces = (data) => {
  return {
    type: GET_INIT_METHODS_SUCCES,
    payload: data,
  };
};

export const getInitMethodsFailure = (error) => {
  return {
    type: GET_INIT_METHODS_FAILURE,
    payload: error,
  };
};
export const getInitMethodsRequest = () => {
  return {
    type: GET_INIT_METHODS_REQUEST,
  };
};

export const fetchPost = (data) => {
  return (dispatch) => {
    axios
      .post(process.env.REACT_APP_API + "createsell", data)
      .then((response) => {
        console.log("respuesta post ", response.data);
        dispatch(addSellOrderList(response.data.temp)); //.buffer
      })
      .catch((error) => {
        console.log("error en envio", error);
      });
  };
};

export const initSellOrder = (param) => {
  return (dispatch) => {
    dispatch(getInitMethodsRequest());
    //console.log("url ", process.env.REACT_APP_API);
    axios
      .get(process.env.REACT_APP_API + param)
      .then((response) => {
        console.log("*******-----------* ", response.data);
        dispatch(getInitMethodsSucces(response.data.buffer)); //[]
      })
      .catch((error) => {
        console.log("no hay datos");
        dispatch(getInitMethodsFailure("No hay datos"));
      });
  };
};

export const fetchSellOrder = (param) => {
  return (dispatch) => {
    dispatch(fetchSellOrderRequest());
    //console.log("url ", process.env.REACT_APP_API);
    axios
      .get(process.env.REACT_APP_API + param)
      .then((response) => {
        dispatch(fetchSellOrderSucces(response.data.buffer)); //[]
      })
      .catch((error) => {
        console.log("no hay datos");
        dispatch(fetchSellOrderFailure("No hay datos"));
      });
  };
};

//export default fetchSellOrder;
