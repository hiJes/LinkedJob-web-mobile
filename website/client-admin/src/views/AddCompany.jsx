import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { asyncCompanyAdd } from "../store/actions/actionCreator"
import { successAlert, errorAlert } from "../helpers/alert"

export default function AddCompany () {
  const [companyState, setCompanyState] = useState({
    name: "",
    companyLogo: "",
    location: "",
    email: "",
    description: ""
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const onChangeCompanyInput = (event) => {
    const { target } = event
    const { value, name: inputName } = target
    // console.log(value, inputName);
    setCompanyState({
      ...companyState,
      [inputName] : value
    })
  }
  const onSubmitCompanyInput = (event) => {
    event.preventDefault()
    dispatch(asyncCompanyAdd(companyState))
      .then((res) => {
        if (res.ok){
          successAlert("Success added new company!")
          navigate("/company")
        } else {
          return res.json()
        }
      })
      .then ((data) => {
        if (data){
          throw(data.message)
        }
      })
      .catch ((error) => {
        errorAlert(error)
        console.log(error, "<<< error di add comp");
      })
  }

  return (
    <>
      <div>
        <div>
          <h3 className='fw-bold'>New Company</h3>
        </div>
        {/* FORM */}
        <form className="mt-3 p-4 border" onSubmit={onSubmitCompanyInput}>
          {/* <!-- Name input --> */}
          <div className="form-outline mb-4">
            <label className="form-label" >Name</label>
            <input type="text" id="form2Example1" className="form-control" name="name" onChange={onChangeCompanyInput}/>
          </div>

          {/* <!-- Company Logo input --> */}
          <div className="form-outline mb-4">
            <label className="form-label" >Company logo</label>
            <input type="text" id="form2Example1" className="form-control" name="companyLogo" onChange={onChangeCompanyInput}/>
          </div>

          {/* <!-- Location input --> */}
          <div className="form-outline mb-4">
            <label className="form-label" >Location</label>
            <input type="text" id="form2Example2" className="form-control" name="location" onChange={onChangeCompanyInput}/>
          </div>

          {/* <!-- Email address input --> */}
          <div className="form-outline mb-4">
            <label className="form-label" >Email address</label>
            <input type="email" id="form2Example1" className="form-control" name="email" onChange={onChangeCompanyInput}/>
          </div>

          {/* <!-- Description input --> */}
          <div className="form-outline mb-4">
            <label className="form-label" >Description</label>
            <textarea name="description" className="form-control" cols="30" rows="5" onChange={onChangeCompanyInput}></textarea>
          </div>

          {/* <!-- Submit button --> */}
          <div className="text-end">
            <Link to={"/company"} type="submit" className="btn btn-block mb-3 me-2 border">Cancel</Link>
            <button type="submit" className="btn btn-primary btn-block mb-3">Save</button>
          </div>
        </form>
      </div>
    </>
  )
}