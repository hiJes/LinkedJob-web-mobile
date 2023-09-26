import { Link } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { asyncJobDeleteSuccess, asyncJobFetchSuccess} from "../store/actions/actionCreator"
import { errorAlert, successAlert } from "../helpers/alert"
import loadingGift from "../assets/loading.gif"

export default function Dashboard () {
  const dispatch = useDispatch()
  const { jobs, isLoading } = useSelector((state) => {
    return state.jobs
  })
  const [skill_state, setSkillState] = useState([])

  const skillHandler =(e, jobSkills)=>{
    e.preventDefault()
    setSkillState(jobSkills)
  }
  // console.log(skill_state, "habis click");
  useEffect(() => {
    dispatch(asyncJobFetchSuccess())
      .catch ((error) => {
        errorAlert(error)
        console.log(error, "<<< error fetch data");
      })
  }, [])

  const deleteHandler = (e, id) => {
    e.preventDefault()
    dispatch(asyncJobDeleteSuccess(id))
      .then((res) => {
        console.log(res);
        if (!res.ok){
         throw ("Job not found")
        }
        successAlert("Delete job successfully!")
        dispatch(asyncJobFetchSuccess())
      })
      .catch((err) => {
        errorAlert(err)
        console.log(err, "<< job delete handler");
      })
  }

  return (
    <>
      <div>
        <div className='d-flex justify-content-between align-item-center mb-3'>
          <h3 className='fw-bold'>Job List</h3>
          <Link to={"/add"} className='btn btn-primary'>+ Create Job</Link>
        </div>
        
        {isLoading && <div className="d-flex align-item-center justify-content-center">
          <img width="200" src={loadingGift} alt="Loading..." />
        </div> }
        {/* TABLE */}
        {!isLoading && 
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Company</th>
                <th scope="col">Created By</th>
                <th scope="col">Job Type</th>
                <th scope="col">Skill</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, idx) =>{
                return <tr key={job.id}>
                <td>{idx + 1}</td>
                <td>{job.title}</td>
                <td>{job.Company.name}</td>
                <td>{job.User.username}</td>
                <td>{job.jobType}</td>
                <td>
                  {/* <!-- Button trigger modal --> */}
                  <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={e => {
                    skillHandler(e, job.Skills)
                  }} skill_state={skill_state}>
                    Detail Skills
                  </button>
                </td>
                <td >
                  <div className="btn-group" role="group">
                    <Link to={`/update/${job.id}`} className='btn btn-primary'>Edit</Link>
                    <button className='btn btn-danger' onClick={(e) => {
                      deleteHandler(e, job.id)
                    }}>Delete</button>
                  </div>
                </td>
              </tr>
              })}
            </tbody>
          </table>
        }


        {/* <!-- Modal --> */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fw-bold fs-5" id="exampleModalLabel">List Skill</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skill_state.map ((el, idx) => {
                      return <tr key={idx}>
                        <td>{idx+1}</td>
                        <td>{el.name}</td>
                        <td>{el.level}</td>
                      </tr>
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}