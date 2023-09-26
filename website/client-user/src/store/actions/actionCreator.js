import { baseUrl } from "../../helpers/constant"
import { COMPANIES_FETCH_FAILED, COMPANIES_FETCH_REQUEST, COMPANIES_FETCH_SUCCESS, JOBS_DETAIL_FAILED, JOBS_DETAIL_REQUEST, JOBS_DETAIL_SUCCESS, JOBS_FETCH_FAILED, JOBS_FETCH_REQUEST, JOBS_FETCH_SUCCESS } from "./actionType"

// JOBS
// Fetch
export const jobFetchRequest = () => {
  return {
    type: JOBS_FETCH_REQUEST,
  }
}
export const jobFetchSuccess = (data) => {
  return {
    type: JOBS_FETCH_SUCCESS,
    payload: data
  }
}
export const jobFetchFailed = (data) => {
  return {
    type: JOBS_FETCH_FAILED,
    payload: data
  }
}
export const asyncJobFetchSuccess = () => {
  return (dispatch, getState) => {
    dispatch(jobFetchRequest())
    return fetch( baseUrl() + "/cust/jobs", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        const action = jobFetchSuccess(data)
        dispatch(action)
      })
      .catch((err) => {
        dispatch(jobFetchFailed(err))
        throw(err)
      })
  }
}
// Detail
export const jobDetailSuccess = (data) => {
  return {
    type: JOBS_DETAIL_SUCCESS,
    payload: data
  }
}
export const jobDetailFailed = (data) => {
  return {
    type: JOBS_DETAIL_FAILED,
    payload: data
  }
}
export const asyncJobDetailSuccess = (id) => {
  return (dispatch, getState) => {
    return fetch( baseUrl() + `/cust/jobs/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        const action = jobDetailSuccess(data)
        dispatch(action)
      })
      .catch((err) => {
        dispatch(jobDetailFailed(err))
        throw(err)
      })
  }
}

// COMPANY
// Fetch
export const companyFetchRequest = () => {
  return {
    type: COMPANIES_FETCH_REQUEST,
  }
}
export const companyFetchSuccess = (data) => {
  return {
    type: COMPANIES_FETCH_SUCCESS,
    payload: data
  }
}
export const companyFetchFailed = (data) => {
  return {
    type: COMPANIES_FETCH_FAILED,
    payload: data
  }
}
export const asyncCompanyFetchSuccess = (id) => {
  return (dispatch, getState) => {
    dispatch(companyFetchRequest())
    return fetch( baseUrl() + `/cust/companies/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        const action = companyFetchSuccess(data)
        dispatch(action)
      })
      .catch((err) => {
        dispatch(companyFetchFailed(err))
      })
  }
}
