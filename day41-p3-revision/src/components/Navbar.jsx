import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", background: "green"}}>
        <Link style={{color: "white", textDecoration: "none"}} to="/">P3 Revision</Link>

        <div style={{display: "flex", gap: "20px"}}>
            <Link style={{color: "white", textDecoration: "none"}} to="/products">API</Link>
            <Link style={{color: "white", textDecoration: "none"}} to="/message">Form Validation</Link>
            <Link style={{color: "white", textDecoration: "none"}} to="/counter">Counter</Link>
            <Link style={{color: "white", textDecoration: "none"}} to="/count-adv">Custom Hook</Link>
            <Link style={{color: "white", textDecoration: "none"}} to="/redux">Redux</Link>
        </div>
    </div>
  )
}

export default Navbar