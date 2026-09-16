import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // Store employees
  const [employees, setEmployees] = useState([]);

  // Store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    joiningDate: "",
    status: "Active"
  });

  // Store employee ID while updating
  const [editId, setEditId] = useState(null);

  // API URL
  const API_URL = "http://localhost:3000/employees";

  // ==========================================
  // GET - Fetch Employees
  // ==========================================

  const getEmployees = async () => {
    try {
      const response = await axios.get(API_URL);

      setEmployees(response.data);
    } catch (error) {
      console.log("Error fetching employees:", error);
    }
  };

  // Call API when component loads
  useEffect(() => {
    getEmployees();
  }, []);

  // ==========================================
  // Handle Input Changes
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // ==========================================
  // POST - Add Employee
  // PUT - Update Employee
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editId) {
        // UPDATE employee
        await axios.put(`${API_URL}/${editId}`, {
          ...formData,
          salary: Number(formData.salary)
        });

        alert("Employee updated successfully");
      } else {
        // ADD employee
        await axios.post(API_URL, {
          ...formData,
          salary: Number(formData.salary)
        });

        alert("Employee added successfully");
      }

      // Clear form
      resetForm();

      // Get latest employees
      getEmployees();

    } catch (error) {
      console.log("Error:", error);
    }
  };

  // ==========================================
  // Load Employee Data into Form
  // ==========================================

  const handleEdit = (employee) => {
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      designation: employee.designation,
      salary: employee.salary,
      joiningDate: employee.joiningDate,
      status: employee.status
    });

    setEditId(employee.id);
  };

  // ==========================================
  // DELETE - Delete Employee
  // ==========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);

      alert("Employee deleted successfully");

      getEmployees();

    } catch (error) {
      console.log("Error deleting employee:", error);
    }
  };

  // ==========================================
  // Reset Form
  // ==========================================

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      salary: "",
      joiningDate: "",
      status: "Active"
    });

    setEditId(null);
  };

  return (
    <div className="container mt-4 mb-5">

      {/* ======================================
          Page Title
      ======================================= */}

      <div className="text-center mb-4">
        <h1>Employee Management System</h1>
        <p className="text-muted">
          Manage employee information using React and REST API
        </p>
      </div>


      {/* ======================================
          Employee Form
      ======================================= */}

      <div className="card shadow-sm mb-4">

        <div className="card-header">
          <h4 className="mb-0">
            {editId ? "Update Employee" : "Add Employee"}
          </h4>
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            {/* Bootstrap Grid */}

            <div className="row">

              {/* Employee Name */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Employee Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter employee name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* Email */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* Phone */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* Department */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Department
                </label>

                <select
                  name="department"
                  className="form-select"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Department
                  </option>

                  <option value="Development">
                    Development
                  </option>

                  <option value="Testing">
                    Testing
                  </option>

                  <option value="HR">
                    HR
                  </option>

                  <option value="Finance">
                    Finance
                  </option>

                  <option value="Marketing">
                    Marketing
                  </option>

                </select>

              </div>


              {/* Designation */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Designation
                </label>

                <input
                  type="text"
                  name="designation"
                  className="form-control"
                  placeholder="Enter designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* Salary */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Salary
                </label>

                <input
                  type="number"
                  name="salary"
                  className="form-control"
                  placeholder="Enter salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* Joining Date */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Joining Date
                </label>

                <input
                  type="date"
                  name="joiningDate"
                  className="form-control"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* Status */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Employment Status
                </label>

                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                >

                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>

                </select>

              </div>

            </div>


            {/* Buttons */}

            <div className="mt-2">

              <button
                type="submit"
                className="btn btn-primary me-2"
              >
                {editId ? "Update Employee" : "Add Employee"}
              </button>


              {editId && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </div>

      </div>


      {/* ======================================
          Employee List
      ======================================= */}

      <div className="card shadow-sm">

        <div className="card-header">
          <h4 className="mb-0">
            Employee List
          </h4>
        </div>

        <div className="card-body">

          <div className="table-responsive">

            <table className="table table-bordered table-hover">

              <thead className="table-dark">

                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Salary</th>
                  <th>Joining Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>

              </thead>


              <tbody>

                {employees.map((employee) => (

                  <tr key={employee.id}>

                    <td>
                      {employee.id}
                    </td>

                    <td>
                      {employee.name}
                    </td>

                    <td>
                      {employee.email}
                    </td>

                    <td>
                      {employee.phone}
                    </td>

                    <td>
                      {employee.department}
                    </td>

                    <td>
                      {employee.designation}
                    </td>

                    <td>
                      ₹{employee.salary}
                    </td>

                    <td>
                      {employee.joiningDate}
                    </td>

                    <td>

                      <span
                        className={
                          employee.status === "Active"
                            ? "badge bg-success"
                            : "badge bg-secondary"
                        }
                      >
                        {employee.status}
                      </span>

                    </td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(employee)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(employee.id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;