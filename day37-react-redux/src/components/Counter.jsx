import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, reset } from '../redux/counterSlice';

function Counter() {
  const counterValue = useSelector(data => data.counter.count);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>{counterValue}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  )
}

export default Counter