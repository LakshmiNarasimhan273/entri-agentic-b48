import React, { useState } from 'react'
import Button from '../components/Button';

function Products({title, price, rating}) {
    const[quantity, setQuantity] = useState(0);

    const addtoCart = () => {
        setQuantity(quantity + 1);
    }

  return (
    <div>
        <h4>{title}</h4>
        <span>{price} - {rating}</span>
        <p>Cart Count: {quantity}</p>
        <Button name="Add to Cart" clickFunction={addtoCart} />
    </div>
  )
}

export default Products