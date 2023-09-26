import { createBrowserRouter, redirect } from "react-router-dom"
import Layout from "./components/Layout"
import Login from './views/Login'
import Dashboard from './views/Dashboard'
import Companies from './views/Companies'
import Register from './views/Register'
import AddCompany from './views/AddCompany'
import AddJob from "./views/AddJob"
import UpdateCompany from "./views/UpdateCompany"
import UpdateJob from "./views/UpdateJob"

const router = createBrowserRouter([
  {
    element: <Layout/>,
    loader:() => {
      if (!localStorage.access_token){
        throw redirect ('/login')
      }
      return null
    },
    children: [
      {
        path: "/",
        element: <Dashboard/>,
      },
      {
        path: "/add",
        element: <AddJob/>,
      },
      {
        path: "/company",
        element: <Companies/>
      },
      {
        path: "/company/add",
        element: <AddCompany/>
      },
      {
        path: "/user/register",
        element: <Register/>
      },
      {
        path: "/update/:id",
        element: <UpdateJob/>
      },
      {
        path: "/companies/update/:id",
        element: <UpdateCompany/>
      },
    ]
  },
  {
    path: "/login",
    element: <Login/>
  }
])

export default router