import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='sidebar bg-dark text-white p-3'>
        <h3 className='mb-4'>Trello Clone</h3>

        <Link className='sidebar-link' to="/">Dashboard</Link>
        <Link className='sidebar-link' to="/kanban">Kanban Board</Link>
    </div>
  )
}

export default Sidebar