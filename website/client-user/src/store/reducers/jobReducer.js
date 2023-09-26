import { JOBS_DETAIL_FAILED, JOBS_DETAIL_REQUEST, JOBS_DETAIL_SUCCESS, JOBS_FETCH_FAILED, JOBS_FETCH_REQUEST, JOBS_FETCH_SUCCESS } from "../actions/actionType"

const initialState = {
  jobs: [],
  job:{},
  isLoading: true,
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
    case JOBS_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case JOBS_DETAIL_SUCCESS:
      return {
        ...state,
        job: action.payload,
        isLoading: false
      }
      case JOBS_DETAIL_FAILED:
        return {
          ...state,
          error: action.payload,
          isLoading: false
        }
    
   default:
     return state
  }  
 }
 