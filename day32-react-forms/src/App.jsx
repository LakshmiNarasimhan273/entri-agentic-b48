import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

function App() {
  // Yup Validation Rules
  const validationSchema = Yup.object({
    // input data validation
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),

    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),

    phone: Yup.number().required("Phone is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },

    validationSchema,

    onSubmit: (values) => {
      console.log("Valid data", values);

      alert("Lead Created");

      formik.resetForm();
    },
  });

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="mb-4">Create Lead</h3>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className={`form-control 
              ${formik.touched.name && formik.errors.name ? "is-invalid" : ""}`}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="invalid-feedback">{formik.errors.name}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input name="email" type="text" className={`form-control 
              ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              />
              {
                formik.touched.email && formik.errors.email && (
                  <div className="invalid-feedback">
                    {formik.errors.email}
                  </div>
                )
              }
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input type="text" name="phone" className={`form-control 
              ${formik.touched.phone && formik.errors.phone ? "is-invalid" : ""}`}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} />

            {
              formik.touched.phone && formik.errors.phone && (
                <div className="invalid-feedback">{formik.errors.phone}</div>
              )
            }

          </div>

          <button type="submit" className="btn btn-warning">
            Create Lead
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
