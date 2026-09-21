import { useEffect, useState } from "react";
import axios from "axios";

function Products() {

  const [products, setProducts] = useState([]);

  const getProducts = async () => {

    try {

      const response = await axios.get(
        "https://fakestoreapi.com/products"
      );

      setProducts(response.data);

    } catch (error) {

      console.log("Error fetching products:", error);

    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container py-5">

      <h2 className="text-center mb-2">
        Our Products
      </h2>

      <p className="text-center text-muted mb-5">
        Explore our latest products
      </p>

      <div className="row g-4">

        {products.map((product) => (

          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>

            <div className="card h-100 shadow-sm">

              <div className="card-body d-flex flex-column">

                <h5 className="card-title">
                  {product.title}
                </h5>

                <p className="text-muted">
                  {product.category}
                </p>

                <p className="card-text">
                  {product.description.substring(0, 100)}...
                </p>

                <h5 className="text-primary mt-auto">
                  ${product.price}
                </h5>

                <button className="btn btn-primary mt-3">
                  Add to Cart
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Products;