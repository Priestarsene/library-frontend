import React from 'react'
import { Link } from 'react-router'

function LibraryHeader() {
    const libraryHeader = "LIBRARY MANAGEMENT SYSTEM";
  return (
    <div>
      <header>
        <h1>{libraryHeader}</h1>
        <Link to="/books" style={{paddingRight:"10px"}}>BOOKS</Link>
        <Link to="/office" style={{paddingRight:"10px"}}>OFFICES</Link>
        <Link to="/">Logout</Link>
        <p>This is a library manangement system that will help you manage books!</p>
      </header>
    </div>
  )
}

export default LibraryHeader
