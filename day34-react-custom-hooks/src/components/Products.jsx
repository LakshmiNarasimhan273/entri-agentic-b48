import React from 'react'
import useFetch from '../hooks/useFetch'

function Products() {

    const{data, loading, error} = useFetch("https://fakestoreapi.com/products");

    if(loading){
        return <h2>Loading...</h2>
    }

    if(error){
        return <h5>{error}</h5>
    }

  return (
    <div>
        <h4>Products Component</h4>

        {
            data.map(product => (
                <div key={product.id}>
                    <p>{product.title}</p>
                </div>
            ))
        }
    </div>
  )
}

export default Products