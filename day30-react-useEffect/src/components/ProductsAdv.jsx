import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function ProductsAdv() {
    const[products, setProducts] = useState([]);

    useEffect(() => {
        Axios.get("https://fakestoreapi.com/products").then(response => setProducts(response.data));
    }, []);

  return (
    <div>
        <h1>Actual Optimized Data</h1>

        {
            products.map(data => (
                <div key={data.id}>
                    <h1>{data.title}</h1>
                    <p>{data.category}</p>
                </div>
            ))
        }
    </div>
  )
}

export default ProductsAdv