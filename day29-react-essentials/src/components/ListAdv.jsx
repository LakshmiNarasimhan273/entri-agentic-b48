import React from "react";
import products from "../data/sample-product";

function ListAdv() {
    const addtoCart = (product) => {
        alert(`Product Added to Cart: ${product.title}`);
    }
  return (
    <div>
      <h3>Sample Products Page</h3>

      {products.map((data) => (
        <div key={data.id}>
          <h4>{data.title}</h4>
          <p>{data.price}</p>
          <button onClick={() => addtoCart(data)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ListAdv;
