import {
  FETCH_SELL_ORDER_FAILURE,
  FETCH_SELL_ORDER_REQUEST,
  FETCH_SELL_ORDER_SUCCES,
  ADD_SELL_ORDER_LIST,
  SET_ID_SELL_ORDER_FOCUS,
  GET_INIT_METHODS_REQUEST,
  GET_INIT_METHODS_FAILURE,
  GET_INIT_METHODS_SUCCES,
} from "../actions/fetchSellOrder.actions";

const initialState = {
  loading: false,
  list: [],
  error: false,
  id: "",
  shipping_methods: [],
};

const SellOrderListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SELL_ORDER_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case FETCH_SELL_ORDER_SUCCES:
      return {
        loading: true,
        list: action.payload,
        error: "",
        id: "",
        shipping_methods: state.shipping_methods,
      };
    case FETCH_SELL_ORDER_FAILURE:
      return {
        loading: false,
        list: [],
        error: action.payload,
        id: "",
        shipping_methods: [],
      };
    case ADD_SELL_ORDER_LIST:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case SET_ID_SELL_ORDER_FOCUS:
      return {
        ...state,
        id: action.payload,
      };
    case GET_INIT_METHODS_REQUEST: {
      return {
        ...state,
      };
    }
    case GET_INIT_METHODS_FAILURE: {
      return {
        ...state,
      };
    }
    case GET_INIT_METHODS_SUCCES: {
      return {
        ...state,
        shipping_methods: action.payload,
      };
    }

    default:
      return state;
  }
};

export default SellOrderListReducer;

/*
 case GET_INIT_METHODS_REQUEST: {
      return {
        ...state,
        shipping_methods: action.payload,
      };
    }
    case GET_INIT_METHODS_FAILURE: {
      return {
        ...state,
        shipping_methods: [],
      };
    }
    case GET_INIT_METHODS_SUCCES: {
      return {
        ...state,
        shipping_methods: action.payload,
      };
    }

    */
