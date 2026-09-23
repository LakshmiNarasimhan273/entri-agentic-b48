import React from 'react'
import useCounter from '../hooks/useCounter'

function CounterA() {
    const{count, increment} = useCounter();
  return (
    <div>
        <h3>{count}</h3>
        <button onClick={increment}>Increment Count</button>
    </div>
  )
}

export default CounterA