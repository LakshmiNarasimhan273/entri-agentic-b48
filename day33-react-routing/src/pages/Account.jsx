import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Account() {
  return (
    <div>
      Account
      <nav>
        <Link to="profile">Profile</Link>
        <Link to="orders">Orders</Link>
      </nav>

      <Outlet />
      </div>
  )
}

export default Account