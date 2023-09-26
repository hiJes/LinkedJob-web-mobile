import { Link } from "react-router-dom";

export default function Home () {
  return (
    <>
      <div className="row mb-5">
        <div className="col align-self-center">
        <img src={"https://cutewallpaper.org/24/job-png/jobsearchingpng-arizona-department-of-economic-security.png"} className="image-fluid object-fit-cover" alt="" />
          
        </div>
        <div className="col align-self-center text-center">
          <h1 className="fw-bold  align-item-center ">
          Your dream job is just a click away
          </h1>
          <br />
          <h5>The simplest way to career opportunities starts here</h5>
          <br />
          <br />
          <Link to={"/job"} className="link-underline-primary link-offset-3-hover link-underline link-underline-opacity-0 fw-bold fs-5 link-underline-opacity-75-hover"> See all job opportunities <i className="bi bi-arrow-right align-item-center"></i></Link>
        </div>
      </div>
    </>
  )  
}