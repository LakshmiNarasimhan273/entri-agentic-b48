import React, { useState } from 'react'
import Button from "../components/Button";

function Counter() {
    // let count = 0;

    // const increaseCount = () => {
    //     count = count + 1;
    //     console.log(count);
    // }
    const[count, setCount] = useState(0);

    const increaseCount = () => {
        setCount(count + 1);
    }

    const decreaseCount = () => {
      setCount(count - 1);
    }
  return (
    <div>
        <h1>Current Count: {count}</h1>
        <Button name="Increase Count" clickFunction={increaseCount} />
        <Button name="Decrease Count" clickFunction={decreaseCount} />
    </div>
  )
}

export default Counter