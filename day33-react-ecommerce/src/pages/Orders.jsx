function Orders() {
  return (
    <div>

      <h4>My Orders</h4>

      <div className="alert alert-success">
        You have 3 recent orders.
      </div>

      <div className="list-group">

        <div className="list-group-item d-flex justify-content-between">
          <span>Order #1001</span>
          <span className="badge bg-success">
            Delivered
          </span>
        </div>

        <div className="list-group-item d-flex justify-content-between">
          <span>Order #1002</span>
          <span className="badge bg-warning text-dark">
            Processing
          </span>
        </div>

        <div className="list-group-item d-flex justify-content-between">
          <span>Order #1003</span>
          <span className="badge bg-primary">
            Shipped
          </span>
        </div>

      </div>

    </div>
  );
}

export default Orders;