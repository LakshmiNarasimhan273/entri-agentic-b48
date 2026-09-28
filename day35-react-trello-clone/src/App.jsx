import React from 'react'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Kanban from './pages/Kanban'
import EditTask from './pages/EditTask'

function App() {
  return (
    <div className='d-flex'>
      <Sidebar />

      <div className='flex-grow-1 bg-light p-4'>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/kanban' element={<Kanban />} />

          <Route path='/tasks/edit/:id' element={<EditTask />} />
        </Routes>
      </div>
    </div>
  )
}

export default App