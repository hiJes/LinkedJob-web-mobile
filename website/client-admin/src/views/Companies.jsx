import { Link } from "react-router-dom"
import { useEffect } from "react"
import { asyncCompanyDeleteSuccess, asyncCompanyFetchSuccess } from "../store/actions/actionCreator"
import { useDispatch, useSelector } from "react-redux"
import loadingGift from "../assets/loading.gif"
import { errorAlert, successAlert } from "../helpers/alert"

export default function Companies () {
  const dispatch = useDispatch()
  const { companies, isLoading } = useSelector ((state) => {
    return state.companies
  })
  useEffect(() => {
   dispatch(asyncCompanyFetchSuccess())
  }, [])

  const deleteHandler = (e, id) => {
    e.preventDefault()
    dispatch(asyncCompanyDeleteSuccess(id))
      .then((res) => {
        console.log(res);
        if (!res.ok){
         throw ("Company not found")
        }
        successAlert("Delete company successfully!")
        dispatch(asyncCompanyFetchSuccess())
      })
      .catch((err) => {
        errorAlert(err)
        console.log(err, "<< company delete handler");
      })
  }
  
  return (
    <>
      <div>
        <div className='d-flex justify-content-between align-item-center mb-3'>
          <h3 className='fw-bold'>Company List</h3>
          <Link className='btn btn-primary' to={"/company/add"}>+ Create Company</Link>
        </div>
        {isLoading && <div className="d-flex align-item-center justify-content-center">
          <img width="200" src={loadingGift} alt="Loading..." />
        </div>}
        {/* TABLE */}
        {!isLoading && 
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Company Logo</th>
                <th scope="col">Location</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, idx) =>{
                  return <tr key={company.id}>
                  <td>{idx + 1}</td>
                  <td>{company.name}</td>
                  <td>
                    <img src={company.companyLogo} alt="" />
                  </td>
                  <td>{company.location}</td>
                  <td>{company.email}</td>
                  <td className='btn-group'>
                    <Link to={`/companies/update/${company.id}`} className='btn btn-primary'>Edit</Link>
                    <button className='btn btn-danger' onClick={(e) => {
                      deleteHandler(e, company.id)
                    }}>Delete</button>
                  </td>
                </tr>
                })}
            </tbody>
          </table>
        }
      </div>
    </>
  )
}