function Home() {
  return (
    <div>

      {/* Hero Section */}
      <section className="bg-light py-5">
        <div className="container">

          <div className="row align-items-center">

            <div className="col-md-7">

              <h1 className="display-5 fw-bold">
                Welcome to ShopEasy
              </h1>

              <p className="lead mt-3">
                Discover quality products at affordable prices.
                Shop your favorite products from the comfort of your home.
              </p>

              <button className="btn btn-primary btn-lg">
                Start Shopping
              </button>

            </div>

            <div className="col-md-5">

              <div className="bg-white p-5 rounded shadow text-center">
                <h3>Online Shopping</h3>

                <p className="text-muted">
                  Simple. Fast. Convenient.
                </p>

                <div className="row mt-4">

                  <div className="col-4">
                    <h4>100+</h4>
                    <small>Products</small>
                  </div>

                  <div className="col-4">
                    <h4>50+</h4>
                    <small>Brands</small>
                  </div>

                  <div className="col-4">
                    <h4>10K+</h4>
                    <small>Users</small>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Features */}
      <section className="py-5">

        <div className="container">

          <h2 className="text-center mb-4">
            Why Shop With Us?
          </h2>

          <div className="row g-4">

            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h4>Quality Products</h4>
                  <p className="text-muted">
                    Find reliable and quality products for your everyday needs.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h4>Affordable Prices</h4>
                  <p className="text-muted">
                    Get your favorite products at reasonable prices.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h4>Easy Shopping</h4>
                  <p className="text-muted">
                    Browse products and enjoy a simple shopping experience.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;