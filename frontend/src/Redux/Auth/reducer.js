import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  PROFILE_FAILURE,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./actionTypes";

const initialState = {
  user: "",
  loading: false,
  isError: false,
};
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGNUP_REQUEST: {
      return { ...state, loading: true };
    }
    case SIGNUP_SUCCESS: {
      return { ...state, loading: false };
    }

    case SIGNUP_FAILURE: {
      return { ...state, loading: false, isError: true };
    }
    case LOGIN_REQUEST: {
      return { ...state, loading: true };
    }
    case LOGIN_SUCCESS: {
      return { ...state, loading: false };
    }

    case LOGIN_FAILURE: {
      return { ...state, loading: false, isError: true };
    }
    case PROFILE_REQUEST: {
      return { ...state, loading: true };
    }
    case PROFILE_SUCCESS: {
      return { ...state, loading: false, user: payload };
    }

    case PROFILE_FAILURE: {
      return { ...state, loading: false, isError: true };
    }
    case LOGOUT_USER: {
      return { ...state, user: "" };
    }
    default:
      return state;
  }
};

export { reducer };
