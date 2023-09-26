import  { combineReducers } from "redux"
import jobReducer from "./jobReducer"
import companyReducer from "./companyReducer"
import userReducer from "./userReducer"

 const rootReducer = combineReducers({
  jobs: jobReducer,
  companies: companyReducer,
  users: userReducer
})
export default rootReducer

