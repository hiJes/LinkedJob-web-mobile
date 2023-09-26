import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncCompanyFetchSuccess, asyncJobAdd } from "../store/actions/actionCreator";
import { errorAlert, successAlert } from "../helpers/alert";
import loadingGift from "../assets/loading.gif"

export default function UpdateJob () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [jobState, setJobState] = useState({
    title: "",
    description: "",
    companyId: 0,
    jobType: "",
  })
  const [skillState, setSkillState] = useState([{
    name: "",
    level: "Beginner"
  }])
  const { companies, isLoading } = useSelector ((state) => {
    return state.companies
  })
  useEffect(() => {
    dispatch(asyncCompanyFetchSuccess())
  }, [])

  const onChangeJob = (event) => {
    const { target } = event
    const { value, name: inputName } = target
    setJobState({
      ...jobState,
      [inputName] : value
    })
  }

  const onSubmitInput = (event) => {
    event.preventDefault()
    console.log(jobState, skillState, "<<< ini di on submit");
    let data = { jobState, skillState }
    dispatch(asyncJobAdd(data))
      .then((res) => {
        if (res.ok) {
          successAlert("Added new job successfully")
          navigate("/")
        }
      })
      .catch ((err) => {
        console.log(err, "<<< ini error di form");
        errorAlert(err)
      })
  }

  return (
    <>
      <div>
        <div>
          <h3 className='fw-bold'>New Job</h3>
        </div>
        {/* FORM */}
        {isLoading && <div className="d-flex align-item-center justify-content-center">
          <img width="200" src={loadingGift} alt="Loading..." />
        </div>}
        {!isLoading && 
          <form className="mt-3 p-4 border" onSubmit={onSubmitInput} >
            {/* <!-- Title input --> */}
            <div className="form-outline mb-4">
              <label className="form-label" >Title</label>
              <input type="text" id="form2Example1" className="form-control" onChange={onChangeJob} name="title"/>
            </div>

            {/* <!-- Company input --> */}
            <div className="form-outline mb-4">
              <label className="form-label" >Company</label>
              <select className="form-select" onChange={onChangeJob} name="companyId" id="">
                {companies.map(el => {
                  return <option value={el.id} key={el.id}>{el.name}</option>
                })}
              </select>
            </div>

            {/* <!-- Job Type input --> */}
            <div className="form-outline mb-4">
              <label className="form-label" >Job Type</label>
              <input type="text" id="form2Example2" className="form-control" onChange={onChangeJob} name="jobType" />
            </div>
 
                      
            {/* <!-- Description input --> */}
            <div className="form-outline mb-4">
              <label className="form-label" >Description</label>
              <textarea onChange={onChangeJob} name="description" className="form-control" cols="30" rows="5" ></textarea>
            </div>

            {/* <!-- Submit button --> */}
            <div className="text-end">
              <Link className="btn btn-block mb-3 me-2 border" to={"/"}>Cancel</Link>
              <button type="submit" className="btn btn-primary btn-block mb-3">Save</button>
            </div>
          </form>
        }
      </div>
    </>
  )
}