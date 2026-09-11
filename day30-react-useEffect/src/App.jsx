import React, { useEffect, useState } from 'react'
import SampleProducts from './components/SampleProducts';
import ProductsAdv from './components/ProductsAdv';

function App() {
  const [count, setCount] = useState(0);
  // useEffect(() => { // mount
  //     // logic - update
  //     console.log("Component loaded");
  // }, [count]); // unmount
  // interview tricky

  // how to know when the component is unmounted
  useEffect(() => {
    console.log("Component mounted")

    return () => {
      console.log("Component unmounted");
    }
  }, []);

  return (
    <div>
      <h1>{count}</h1>

      <button onClick={() => setCount(count + 1)}>Increase</button>

      <SampleProducts />
      <hr />
      <ProductsAdv />
    </div>
  )
}

export default App