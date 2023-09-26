import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo2.png"

export default function Sidebar () {
  const navigate = useNavigate()
  const logoutHandler = (event) => {
    event.preventDefault()
    localStorage.clear()
    navigate('/login')
  } 


  return (
    <>
      <div className='col-2 pt-3 border shadow-sm'>
        <Link className="d-flex justify-content-center mb-2" to="/">
          <img src={logo} alt="LinkedJob" width="190"/>
        </Link>
        <div className='container-fluid'>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link link-dark fw-bold" aria-current="page" to="/">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link link-dark fw-bold" to="/company">Companies</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link link-dark fw-bold" to="/user/register">Register Admin</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link link-dark fw-bold" onClick={logoutHandler}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}