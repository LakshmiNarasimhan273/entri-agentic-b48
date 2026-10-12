import React from 'react'
import useCounter from '../hooks/useCounter'

function CounterAdv() {
    const {count, increment} = useCounter();
  return (
    <div>
        <h4>{count}</h4>
        <button onClick={increment}>Increment</button>
    </div>
  )
}

export default CounterAdv