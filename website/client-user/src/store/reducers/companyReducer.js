import { COMPANIES_FETCH_FAILED, COMPANIES_FETCH_REQUEST, COMPANIES_FETCH_SUCCESS } from "../actions/actionType"

const initialState = {
  companies: [],
  isLoading: false,
  error: null
}
export default function companyReducer (state = initialState, action) {
  switch (action.type) {
   case COMPANIES_FETCH_REQUEST:
     return {
       ...state,
       isLoading: true
     }
    case COMPANIES_FETCH_SUCCESS:
     return {
       ...state,
       companies: action.payload,
       isLoading: false
     }
     case COMPANIES_FETCH_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
   default:
     return state
  }  
 }
 