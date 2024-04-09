import React from 'react'
import { Outlet } from 'react-router-dom'
import Service from '../components/Home/Service'

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center px-4 select-none">

      <Outlet />
      <Service/>
    </div>
  )
}

export default Home