import { Link, useNavigate } from "react-router-dom"

export default function Card ({job}) {
  const navigate = useNavigate()
  
  return (
    <>
      <div className="card mb-2">
        <div className="d-flex">
          <div className="col-2 p-4">
            <img src={job.Company.companyLogo} className="card-img-top" alt={job.Company.name}/>
          </div>
          <div className="card-body col-10 d-flex align-item-center"> 
            <div className="col-11">
              <h4 className="card-title">{job.title}</h4>
              <h6>{job.Company.name}</h6>
            </div>
            <div className="col text-center">
              <Link to={`/job/${job.id}`} className="btn btn-primary">Detail</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )  
}