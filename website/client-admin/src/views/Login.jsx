import { useState } from "react"
import logo from "../assets/logo2.png"
import { useDispatch } from "react-redux"
import { asyncUserLoginSuccess } from "../store/actions/actionCreator"
import { errorAlert, successAlert } from "../helpers/alert"
import { useNavigate } from "react-router"
export default function Login () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userState, setUserState] = useState({
    email: "",
    password: ""
  })
  const onChangeInput = (event) => {
    const { target } = event
    const { value, name: inputName } = target

    setUserState ({
      ...userState,
      [inputName]:value
    })
  }
  
  const onSubmitInput = (event) => {
    event.preventDefault()
    dispatch(asyncUserLoginSuccess(userState))
      .then((res) => {
        return res.json()
      })
      .then((data)=>{
        if (data.message) {
          throw (data.message)
        }
        localStorage.access_token = data.access_token
        localStorage.email = data.email
        localStorage.username = data.username
        successAlert("Login success!")
        navigate("/")
      })
      .catch ((error) => {
        errorAlert(error)
        console.log(error, "<<< error di login");
      }) 
  }

  return (
    <>
      <form className="container-fluid col-4 my-5 p-4 border"  onSubmit={onSubmitInput}>
        <div className="mb-4">
          <a className="navbar-brand mb-3 d-flex justify-content-center" href="#">
            <img src={logo} alt="LinkedJob" width="250"/>
          </a>
          <h3 className="text-center fw-bold">Welcome Back!</h3>
        </div>
        {/* Email input*/}
        <div className="form-outline mb-4">
          <label className="form-label" >Email address</label>
          <input type="email" id="form2Example1" className="form-control" name="email" onChange={onChangeInput}/>
        </div>

        {/* Password input*/}
        <div className="form-outline mb-4">
          <label className="form-label" >Password</label>
          <input type="password" id="form2Example2" className="form-control" name="password" onChange={onChangeInput}/>
        </div>

        {/*2 column grid layout for inline styling*/}
        <div className="row mb-4">
          <div className="col d-flex">
            {/* Checkbox*/}
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="form2Example34" />
              <label className="form-check-label" > Remember me </label>
            </div>
          </div>

          <div className="col text-end">
            {/* Simple link*/}
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        {/* Submit button*/}
        <div className="d-grid text-center">
          <button type="submit" className="btn btn-primary btn-block mb-3">Sign in</button>
        </div>
      </form>
    </>
  )
}