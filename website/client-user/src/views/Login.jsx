import { useState } from 'react'

export default function Login() {
  const [loginState, setLoginState] = useState({
    email: '',
    password: ''
  })

  const onChangeLoginInput = (event) => {
    const { target } = event
    const { value, name: nameLogin } = target

    console.log(nameLogin, value);
    setLoginState({
      ...loginState,
      [nameLogin]: value
    })
  }

  const onSubmitLogin = (event) => {
    event.preventDefault()
    console.log(loginState);

  }

  return (
    <>
      <form  onSubmit = {() => {
        onSubmitLogin
        }} className="container-fluid col-5 mt-3 p-4 border" >
        <div className="mb-4">
          <h3 className="text-center">Welcome!</h3>
        </div>
        {/* <!-- Email input --> */}
        <div className="form-outline mb-4">
          <label className="form-label" >Email address</label>
          <input type="email" id="form2Example1" className="form-control" name="email" onChange={() => {
            onChangeLoginInput
            }}/>
        </div>

        {/* <!-- Password input --> */}
        <div className="form-outline mb-4">
          <label className="form-label" >Password</label>
          <input type="password" id="form2Example2" className="form-control" name="password" onChange={() => {
            onChangeLoginInput
            }}/>
        </div>

        {/* <!-- 2 column grid layout for inline styling --> */}
        <div className="row mb-4">
          <div className="col d-flex">
            {/* <!-- Checkbox --> */}
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="form2Example34" />
              <label className="form-check-label" > Remember me </label>
            </div>
          </div>

          <div className="col text-end">
            {/* <!-- Simple link --> */}
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        {/* <!-- Submit button --> */}
        <div className="d-grid text-center">
          <button type="submit" className="btn btn-primary btn-block mb-3">Sign in</button>
          <p>or</p>
          <button type="submit" className="btn btn-primary btn-block mb-2">Google Sign in</button>
        </div>

        {/* <!-- Register buttons --> */}
        <div className="text-center">
          <p>Not a member? <a href="#!">Register</a></p>
        </div>
      </form>
    </>
  )  
}