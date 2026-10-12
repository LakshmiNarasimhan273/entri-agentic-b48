import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Products from './pages/Products'
import Message from './pages/Message'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Counter from './pages/Counter'
import CounterAdv from './pages/CounterAdv'
import ReduxEg from './pages/ReduxEg'

function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/message' element={<Message />} />
        <Route path='/counter' element={<Counter count={count} increase={increment} />} />
        <Route path='/count-adv' element={<CounterAdv />} />
        <Route path='redux' element={<ReduxEg />} />
      </Routes>
    </div>
  )
}

export default App