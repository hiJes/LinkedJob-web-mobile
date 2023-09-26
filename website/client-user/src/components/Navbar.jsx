import logo from "../assets/logo.png"
import { Link } from "react-router-dom"

export default function Navbar() {
  return(
    <>
      {/* <!-- Navbar --> */}
      <nav className="navbar shadow-sm navbar-expand-lg border p-4 mx-3 mt-3 rounded-4">
        <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Bootstrap" width="100"/>
        </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item me-3">
                <a className="nav-link active" aria-current="page" href="#">Jobseeker</a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link" href="#">Employer</a>
              </li>
              <li className="nav-item mx-2 ">
              <button className="btn btn-primary"> Sign In</button>
              </li>
              <li className="nav-item ms-4">
                <button className="btn btn-outline-primary"> Sign Up</button>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-dark" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>

    </>
  )
}