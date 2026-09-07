import React from 'react'
import Button from '../components/Button'

function Register() {
  return (
    <div>
        <h3>Register Form</h3>
        <input type="text" placeholder='Username' />
        <input type="text" placeholder='Email' />
        <input type="text" placeholder='Password' />
       <Button name="Register" />
    </div>
  )
}

export default Register