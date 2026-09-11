import React, { useEffect, useState } from 'react'

function SampleProducts() {
    const[products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products").then(response => response.json()).then(data => setProducts(data));
    }, []);
    console.log(products);
  return (
    <div>
        <h1>Sample Products.com</h1>

        {
            products.map(data => (
                <div key={data.id}>
                    <h3>{data.title}</h3>
                    <p>{data.price}</p>
                </div>
            ))
        }
    </div>
  )
}

export default SampleProducts