import {createBrowserRouter} from "react-router-dom"
import Login from "./views/Login";
import Layout from "./components/Layout";
import Home from "./views/Home";
import Jobs from "./views/Jobs";
import CompanyDetail from "./views/CompanyDetail";
import JobDetail from "./views/JobDetail";
const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/job",
        element: <Jobs/>,
      },
      {
        path: "/company/:id",
        element: <CompanyDetail/>,
      },
      {
        path: "/job/:id",
        element: <JobDetail/>,
      },
    ]
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

export default router