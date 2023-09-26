import Card from "../components/Card";
import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { asyncCompanyFetchSuccess} from "../store/actions/actionCreator"
import { errorAlert } from "../helpers/alert"
import loadingGift from "../assets/loading.gif"
import { useParams, Link } from 'react-router-dom';

export default function CompanyDetail () {
  const dispatch = useDispatch()
  const { companies, isLoading } = useSelector((state) => {
    return state.companies
  })
  
  let { id } = useParams();
  useEffect(() => {
    dispatch(asyncCompanyFetchSuccess(id))
      .catch ((error) => {
        errorAlert(error)
        console.log(error, "<<< error fetch data");
      })
    // console.log(companies, "liat");
  }, [])

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
            <li className="breadcrumb-item active" aria-current="page">{companies.name}</li>
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
                <h1 className="fw-bold">{companies.name}</h1>
                <div className="fs-6 pb-3 mt-3">
                  <span className="fw-bold">Address : </span> <br />
                  {companies.location}
                </div>
                <div className="fs-6">
                  <span className="fw-bold">Email : </span> {companies.email}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid border rounded pb-3 mt-5">
          <div className="mt-3 px-3">
            <h5 className="fw-bold">About Company</h5>
            <p className="fs-6">
              {companies.description}
            </p>
          </div>
        </div>

        <div className="border rounded mt-5">
          <div className="p-3 bg-primary">
            <h5 className="fw-bold">Jobs Opening</h5>
          </div>
          {/* {companies.Jobs.map(el => {
            <Card job={el}/>
          })} */}
        </div>
      </div>
      }
    </>
  )  
}