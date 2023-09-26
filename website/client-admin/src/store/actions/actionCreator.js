import { baseUrl } from "../../helpers/constant"
import { COMPANIES_ADD_DATA, COMPANIES_ADD_FAILED, COMPANIES_DELETE_FAILED, COMPANIES_DELETE_SUCCESS, COMPANIES_FETCH_FAILED, COMPANIES_FETCH_REQUEST, COMPANIES_FETCH_SUCCESS, JOBS_ADD_DATA, JOBS_ADD_FAILED, JOBS_DELETE_FAILED, JOBS_DELETE_SUCCESS, JOBS_FETCH_FAILED, JOBS_FETCH_REQUEST, JOBS_FETCH_SUCCESS, USERS_ADD_DATA, USERS_ADD_FAILED, USERS_LOGIN_FAILED, USERS_LOGIN_SUCCESS } from "./actionType"

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
    return fetch( baseUrl() + "/jobs", {
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token
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
// Add
export const jobAdd = (data) => {
  return {
    type: JOBS_ADD_DATA,
    payload: data
  }
}
export const jobAddFailed = (data) => {
  return {
    type: JOBS_ADD_FAILED,
    payload: data
  }
}
export const asyncJobAdd = (jobState) => {
  return (dispatch, getState) => {
    const action = jobAdd(jobState)
    dispatch(action)
    return fetch(baseUrl() + "/jobs", {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token
      },
      body: JSON.stringify(jobState)
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        dispatch(jobAddFailed(err))
        throw(err)
      })
  }
}
// Delete
const jobDeleteSuccess = (data) => {
  return {
    type: JOBS_DELETE_SUCCESS,
    payload: data
  }
}
const jobDeleteFailed = (data) => {
  return {
    type: JOBS_DELETE_FAILED,
    payload: data
  }
}
export const asyncJobDeleteSuccess = (id) => {
  return (dispatch, getState) => {
    dispatch(jobDeleteSuccess(id))
    return fetch(baseUrl() + `/jobs/${id}`, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token
      }
    })
      .then ((res) => {
        return res
      })
      .catch((err) => {
        dispatch(jobDeleteFailed(err))
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
export const asyncCompanyFetchSuccess = () => {
  return (dispatch, getState) => {
    dispatch(companyFetchRequest())
    fetch( baseUrl() + "/companies", {
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token
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
// Add
export const companyAdd = (data) => {
  return {
    type: COMPANIES_ADD_DATA,
    payload: data
  }
}
export const companyAddFailed = (data) => {
  return {
    type: COMPANIES_ADD_FAILED,
    payload: data
  }
}
export const asyncCompanyAdd = (companyState) => {
  return (dispatch, getState) => {
    const action = companyAdd(companyState)
    dispatch(action)
    return fetch (baseUrl() + "/companies", {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token
      },
      body: JSON.stringify(companyState)
    })
    .then((res) => {
      return (res)
    })
    .catch((err) => {
      dispatch(companyAddFailed(err))
      throw (err)
    })
  }
}
// Delete
const companyDeleteSuccess = (data) => {
  return {
    type: COMPANIES_DELETE_SUCCESS,
    payload: data
  }
}
const companyDeleteFailed = (data) => {
  return {
    type: COMPANIES_DELETE_FAILED,
    payload: data
  }
}
export const asyncCompanyDeleteSuccess = (id) => {
  return (dispatch, getState) => {
    dispatch(companyDeleteSuccess(id))
    return fetch(baseUrl() + `/companies/${id}`, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token
      }
    })
      .then ((res) => {
        return res
      })
      .catch((err) => {
        dispatch(companyDeleteFailed(err))
        throw(err)
      })
  }
}

// USERS
// Add
export const userAdd = (data) => {
  return {
    type: USERS_ADD_DATA,
    payload: data
  }
}
export const userAddFailed = (data) => {
  return {
    type: USERS_ADD_FAILED,
    payload: data
  }
}
export const asyncUserAdd = (adminState) => {
  return (dispatch, getState) => {
    const action = userAdd(adminState)
    dispatch(action)

    return fetch( baseUrl() +"/register", {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token
      },
      body: JSON.stringify(adminState)
    })
      .then((res) => {
        return (res)
      })
      .catch((err) => {
        dispatch(userAddFailed(err))
        throw (err)
      })
  }
}
// Login
export const userLoginSuccess = (data) => {
  return {
    type: USERS_LOGIN_SUCCESS,
    payload: data
  }
}
export const userLoginFailed = (data) => {
  return {
    type: USERS_LOGIN_FAILED,
    payload: data
  }
}
export const asyncUserLoginSuccess = (userState) => {
  return (dispatch, getState) => {
    const action = userAdd(userState)
    dispatch(action)

    return fetch( baseUrl() +"/login", {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userState)
    })
      .then((res) => {
        console.log(res, "<<< ini res");
        return res
      })
      .catch((err) => {
        dispatch(userAddFailed(err))
        throw (err)
      })
  }
}