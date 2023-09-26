import { useEffect, } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { asyncJobDetailSuccess} from "../store/actions/actionCreator"
import { errorAlert } from "../helpers/alert"
import loadingGift from "../assets/loading.gif"
import { useParams, Link } from 'react-router-dom';

export default function JobDetail () {
  const dispatch = useDispatch()

  const { job, isLoading } = useSelector((state) => {
    return state.jobs
  })
  
  let { id } = useParams();
  useEffect(() => {
    dispatch(asyncJobDetailSuccess(id))
    .catch ((error) => {
      errorAlert(error)
      console.log(error, "<<< error fetch data");
    })
    }, [isLoading])

  return (
    <>
      {isLoading && <div className="d-flex align-item-center justify-content-center">
          <img width="200" src={loadingGift} alt="Loading..." />
        </div> }

      {!isLoading && 
        <div>
          {/* Bread crumbs */}
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
              <li className="breadcrumb-item"><Link to={`/company/${job.Company.id}`}>{job.Company.name}</Link></li> 
              <li className="breadcrumb-item active" aria-current="page">{job.title}</li>
            </ol>
          </nav>
          {/* Content */}
          <div>
            <img src={"https://s3-ap-southeast-1.amazonaws.com/kalibrr-static-assets/assets/shared/img/banners/Job-post--Default-Banner.png"} className="image-fluid object-fit-cover" alt="" width="100%" height="300"/>
          </div>
          <div className="container-fluid border pb-3">
            <div className="mt-3 px-3">
              <div className="d-flex">
                <div className="col-10">
                  <h1 className="fw-bold">{job.title}</h1>
                  <div className="fs-4 pb-1">{job.Company.name}</div>
                  <div className="fs-5"><i className="bi bi-asterisk"></i> {job.jobType}</div>
                </div>
                <div className="col text-center border">
                  <img src={job.Company.companyLogo} className="image-fluid object-fit-cover" alt="" width="200"/>
                </div>
              </div>
              <div className="mt-3">
                <button className="btn btn-primary btn-lg">Apply</button>
              </div>
            </div>
          </div>
          <div className="container-fluid border pb-3">
            <div className="mt-3 px-3">
              <h4 className="fw-bold">Job Description</h4>
              <p className="fs-5">
                {job.description}
              </p>
            </div>
            <div className="mt-4 px-3">
              <h4 className="fw-bold">Skill :</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Level</th>
                  </tr>
                </thead>
                <tbody>
                  {job.Skills.map ((el, idx) => {
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
      }

      
    </>
  )  
}