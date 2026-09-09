import React from 'react'
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';

function ConditionalRendering() {
    let isLoggedin = true;
  return (
    <div>
        <h1>ConditionalRendering</h1>

        {
            isLoggedin ? (
                <Dashboard />
            ) : (
                <Login />
            )
        }

    </div>
  )
}

export default ConditionalRendering