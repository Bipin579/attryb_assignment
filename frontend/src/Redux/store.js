import { legacy_createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk";
import {reducer as AuthReducer} from "../Redux/Auth/reducer"
const store = legacy_createStore(AuthReducer, applyMiddleware(thunk))

export default store


