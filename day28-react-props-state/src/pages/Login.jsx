import React from 'react'
import Button from '../components/Button'

function Login() {
  return (
    <div>
        <h3>Login Form</h3>
        <input type="text" placeholder='Email' />
        <input type="text" placeholder='Password' />
        <Button name="Login" />
    </div>
  )
}

export default Login