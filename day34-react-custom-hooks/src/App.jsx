import React from 'react'
import Counter from './components/Counter'
import CounterA from './components/CounterA'
import Products from './components/Products'
import Users from './components/Users'

function App() {
  return (
    <div>
      <Counter />
      <CounterA />
      <Products />
      <hr />
      <Users />
    </div>
  )
}

export default App