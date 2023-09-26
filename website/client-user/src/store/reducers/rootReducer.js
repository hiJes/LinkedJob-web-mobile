import  { combineReducers } from "redux"
import jobReducer from "./jobReducer"
import companyReducer from "./companyReducer"

 const rootReducer = combineReducers({
  jobs: jobReducer,
  companies: companyReducer,
})
export default rootReducer