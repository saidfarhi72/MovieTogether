import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
        <div className="navbar z-40 border-b border-solid  bg-base-100 fixed ">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      
    </div>
    <Link to={''} className="btn btn-ghost normal-case text-xl">MovieTogther</Link>
  </div>
  
  <div className="navbar-end">
    <Link to='#' className="btn">Button</Link>
  </div>
</div>
  )
}

export default Navbar