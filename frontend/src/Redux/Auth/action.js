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
import axios from "axios";

const signupRequestAction = () => {
  return { type: SIGNUP_REQUEST };
};

const signupSuccessAction = () => {
  return { type: SIGNUP_SUCCESS };
};
const signupFailureAction = () => {
  return { type: SIGNUP_FAILURE };
};

const loginRequestAction = () => {
  return { type: LOGIN_REQUEST };
};

const loginSuccessAction = () => {
  return { type: LOGIN_SUCCESS };
};
const loginFailureAction = () => {
  return { type: LOGIN_FAILURE };
};

const getUserRequestAction = () => {
  return { type: PROFILE_REQUEST };
};

const getUserSuccessAction = (payload) => {
  return { type: PROFILE_SUCCESS, payload };
};
const getUserFailureAction = () => {
  return { type: PROFILE_FAILURE };
};

const logoutUserAction = (payload) => {
  return { type: LOGOUT_USER, payload };
};

export const signup = (user, pass, fail, navigate) => (dispatch) => {
  dispatch(signupRequestAction());
  axios
    .post(`https://beautiful-cuff-cow.cyclic.app/signup`, user)
    .then((res) => {
      pass(res.data.message);
      navigate();
      dispatch(signupSuccessAction());
    })
    .catch((err) => {
      dispatch(signupFailureAction());
      fail();
    });
};

export const login = (user, pass, fail, navigate) => (dispatch) => {
  dispatch(loginRequestAction());
  axios
    .post(`https://beautiful-cuff-cow.cyclic.app/login`, user)
    .then((res) => {
      const token = res.data.token;
      document.cookie = `jwt=${token}; path=/; SameSite=Strict; Secure;`;

      pass(res.data.message);
      navigate();
      dispatch(loginSuccessAction());
    })
    .catch((err) => {
      dispatch(loginFailureAction());
      fail();
    });
};

function getCookie(name) {
  const cookieValue = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return cookieValue ? cookieValue[2] : null;
}

export const getUser = ()=>async (dispatch) => {
  dispatch(getUserRequestAction());
  const token = await getCookie("jwt");
  console.log(token);
  await axios
    .get(`https://beautiful-cuff-cow.cyclic.app/user/profile?secret_token=${token}`)
    .then((res) => {
      console.log(res);
      dispatch(getUserSuccessAction(res.data.user.email));
    })
    .catch((err) => {
      dispatch(getUserFailureAction());
      console.log(err.message);
    });
};

export const logoutUser = () => async (dispatch) => {
  const expireCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };
  expireCookie("jwt");
  dispatch(logoutUserAction());
  window.location.reload();
};
