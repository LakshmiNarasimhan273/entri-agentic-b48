import React from 'react'
import useCounter from '../hooks/useCounter';

function Counter() {
  const {count, increment, decrement, reset} = useCounter();

  return (
    <div>
      <h1>{count}</h1>

      <button onClick={increment}>Increase</button>
      <button disabled={count === 0} onClick={decrement}>Decrease</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default Counter