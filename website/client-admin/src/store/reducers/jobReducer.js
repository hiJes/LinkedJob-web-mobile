import { JOBS_FETCH_FAILED, JOBS_FETCH_REQUEST, JOBS_FETCH_SUCCESS } from "../actions/actionType"

const initialState = {
  jobs: [],
  isLoading: false,
  error: null
}
export default function jobReducer (state = initialState, action) {
  switch (action.type) {
   case JOBS_FETCH_REQUEST:
     return {
       ...state,
       isLoading: true
     }
    case JOBS_FETCH_SUCCESS:
     return {
       ...state,
       jobs: action.payload,
       isLoading: false
     }
     case JOBS_FETCH_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
   default:
     return state
  }  
 }
 