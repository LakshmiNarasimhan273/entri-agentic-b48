import React from "react";
import products from "../data/products";

function Products() {
    const addtoCart = (product) => {
        alert(`${product.title}, added to cart`)
    }
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">ShopSphere</h1>

      <div className="row">
        {products.map((data) => (
          <div className="col-md-3 mb-4" key={data.id}>
            <div className="card h-100">
              <img
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
                src={data.image}
                alt=""
              />

              <div className="card-body">
                <h5 className="card-title">{data.title}</h5>
                <p className="card-text">{data.description}</p>
                <h5>${data.price}</h5>
                <p>{data.rating}ratings</p>
                {
                    data.inStock ? (
                        <button onClick={() => addtoCart(data)} className="btn btn-primary w-100">Add to Cart</button>
                    ) : (
                        <button className="btn btn-secondary w-100" disabled>Out of Stock</button>
                    )
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
