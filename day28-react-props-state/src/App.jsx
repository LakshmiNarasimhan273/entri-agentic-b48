import React from 'react'
import Courses from './components/Courses'
import Login from './pages/Login';
import Register from './pages/Register';
import Counter from './pages/Counter';
import Products from './pages/Products';

function App() {
  return (
    <div>
        <Courses title="FSD" desc="Agentic MERN" /> 
        <Courses title="DA" desc="AI Analytics" />

        <Login />
        <Register />

        <Counter />

        <Products title="Laptop" price={50000} rating={4.5} />
        <Products title="Monitor" price={5000} rating={4.8} />
        <Products title="Keyboard" price={500} rating={3} />
    </div>
  )
}

export default App