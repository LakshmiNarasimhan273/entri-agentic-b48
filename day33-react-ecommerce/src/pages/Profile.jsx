import { Link, Outlet } from "react-router-dom";

function Profile() {
  return (
    <div className="container py-5">

      <div className="row">

        {/* Profile Information */}
        <div className="col-md-4">

          <div className="card shadow-sm">

            <div className="card-body text-center">

              <div
                className="bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{
                  width: "100px",
                  height: "100px",
                  fontSize: "40px"
                }}
              >
                N
              </div>

              <h3>Narasimhan</h3>

              <p className="text-muted">
                narasimhan@example.com
              </p>

              <button className="btn btn-outline-primary">
                Edit Profile
              </button>

            </div>

          </div>

        </div>

        {/* Profile Content */}
        <div className="col-md-8">

          <div className="card shadow-sm">

            <div className="card-body">

              <h3 className="mb-4">
                My Profile
              </h3>

              {/* Nested Navigation */}
              <div className="d-flex gap-2 mb-4">

                <Link
                  to="/profile/orders"
                  className="btn btn-outline-primary"
                >
                  My Orders
                </Link>

                <Link
                  to="/profile/favorites"
                  className="btn btn-outline-danger"
                >
                  Favorites
                </Link>

              </div>

              {/* Nested Route Component */}
              <Outlet />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;