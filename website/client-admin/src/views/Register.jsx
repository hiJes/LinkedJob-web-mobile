import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { asyncUserAdd } from "../store/actions/actionCreator"
import { errorAlert, successAlert } from "../helpers/alert"

export default function Register () {
  const [adminState, setAdminState] = useState({
    username: '',
    email: '',
    password: '',
    role: 'admin',
    phoneNumber: '',
    address: ''
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const onChangeInput = (event) => {
    const { target } = event
    const { value, name: inputName } = target
    setAdminState({
      ...adminState,
      [inputName] : value
    })
  }
  const onSubmitInput = (event) => {
    event.preventDefault()
    dispatch(asyncUserAdd(adminState))
      .then((res) => {
        if (res.ok){
          successAlert("Success added new admin!")
          navigate("/")
        } else {
          return res.json()
        }
      })
      .then((data) => {
        if(data){
          throw(data.message)
        }
      })
      .catch((err) => {
        console.log(err);
        errorAlert(err, "<< di register")
      })
  }  
  
  return (
    <>
      <div>
        <div>
          <h3 className='fw-bold'>Register New Admin</h3>
        </div>
        {/* FORM */}
        <form className="mt-3 p-4 border" onSubmit={onSubmitInput}>
          {/* <!-- Username input --> */}
          <div className="form-outline mb-4">
            <label className="form-label" >Username</label>
            <input type="text" id="form2Example1" className="form-control" name="username" onChange={onChangeInput}/>
          </div>

          {/* <!-- Email input --> */}
          <div className="form-outline mb-4">
            <label className="form-label" >Email address</label>
            <input type="email" id="form2Example1" className="form-control" name="email" onChange={onChangeInput}/>
          </div>

          {/* <!-- Password input --> */}
          <div className="form-outline mb-4">
            <label className="form-label" >Password</label>
            <input type="password" id="form2Example2" className="form-control" name="password" onChange={onChangeInput}/>
          </div>

          {/* <!-- Phone Number input --> */}
          <div className="form-outline mb-4">
            <label className="form-label" >Phone Number</label>
            <input type="text" id="form2Example1" className="form-control" name="phoneNumber" onChange={onChangeInput}/>
          </div>

          {/* <!-- Address input --> */}
          <div className="form-outline mb-4">
            <label className="form-label" >Address</label>
            <textarea name="address" className="form-control" cols="30" rows="5" onChange={onChangeInput}></textarea>
          </div>

          {/* <!-- Submit button --> */}
          <div className="text-end">
            <button type="submit" className="btn btn-block mb-3 me-2 border">Cancel</button>
            <button type="submit" className="btn btn-primary btn-block mb-3">Save</button>
          </div>
        </form>
      </div>
    </>
  )
}