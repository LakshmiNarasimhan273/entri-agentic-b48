import React from 'react'

function Counter({count, increase}) {
  return (
    <div>
        <h1>{count}</h1>
        <button onClick={increase}>Increment</button>
    </div>
  )
}

export default Counter