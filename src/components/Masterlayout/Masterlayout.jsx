import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

export default function Masterlayout({user , LogOut}) {
  return (
    <>
    <div className=' bg-Home'>
    <Navbar user={user} LogOut={LogOut}/>
    <div>
    <Outlet bg-black  />
    </div>
    </div>
    </>
  )
}
