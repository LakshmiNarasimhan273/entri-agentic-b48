import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment } from '../redux/counterSlice';

function ReduxEg() {
    const count = useSelector(data => data.counter.count)
    const dispatch = useDispatch();
  return (
    <div>
        <h2>Count: {count}</h2>
        <button onClick={() => dispatch(increment())}>Increment</button>
    </div>
  )
}

export default ReduxEg