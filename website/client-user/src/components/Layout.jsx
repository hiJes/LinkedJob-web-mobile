import Footer from "./Footer"
import Navbar from "./Navbar"
import {Outlet} from "react-router-dom"

export default function Layout (){
  return (
    <>
      <Navbar/>
      <div className="conteiner-fluid rounded mx-3 mt-3">
        <Outlet/>
      </div>
      <Footer/>
    </>
  )
}