import Card from "../components/Card";
import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { asyncJobFetchSuccess} from "../store/actions/actionCreator"
import { errorAlert } from "../helpers/alert"
import loadingGift from "../assets/loading.gif"
import { Link } from 'react-router-dom';

export default function Jobs () {
  const dispatch = useDispatch()
  const { jobs, isLoading } = useSelector((state) => {
    return state.jobs
  })
  
  useEffect(() => {
  dispatch(asyncJobFetchSuccess())
    .catch ((error) => {
      errorAlert(error)
      console.log(error, "<<< error fetch data");
    })
  }, [])
  
  return (
    <>
      {/* Bread crumbs */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Job Board</li>
        </ol>
      </nav>
      {/* Content */}
      {isLoading && <div className="d-flex align-item-center justify-content-center">
          <img width="200" src={loadingGift} alt="Loading..." />
        </div> }
      {!isLoading && 
        jobs.map(job => {
          return <Card key={job.id} job={job}/>
        })
      }
    </>
  )  
}