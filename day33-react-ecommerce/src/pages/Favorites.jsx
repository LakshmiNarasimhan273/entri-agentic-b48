function Favorites() {
  return (
    <div>

      <h4>My Favorites</h4>

      <p className="text-muted">
        Products you have added to your favorites will appear here.
      </p>

      <div className="row g-3">

        <div className="col-md-6">

          <div className="card border-danger">

            <div className="card-body">

              <h5>Favorite Product 1</h5>

              <p className="text-muted">
                This is one of your favorite products.
              </p>

              <button className="btn btn-outline-danger">
                Remove
              </button>

            </div>

          </div>

        </div>

        <div className="col-md-6">

          <div className="card border-danger">

            <div className="card-body">

              <h5>Favorite Product 2</h5>

              <p className="text-muted">
                This is one of your favorite products.
              </p>

              <button className="btn btn-outline-danger">
                Remove
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Favorites;