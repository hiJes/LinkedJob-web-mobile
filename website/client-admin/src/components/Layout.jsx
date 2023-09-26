import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Outlet } from 'react-router'


export default function Layout () {
  return (
    <>
      <div className='d-flex'>
        <Sidebar/>
        <div className='col-10'>
          <div>
            {/* NAVBAR */}
            <Navbar/>
            {/* CONTENT */}
            <div className='mt-5 mx-5 px-2'>
              <Outlet/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}