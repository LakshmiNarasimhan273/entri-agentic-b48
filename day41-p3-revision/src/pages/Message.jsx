import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Message() {
    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required").min(3, "Name must be at least 3 characters")
    });

  return (
    <Formik
        initialValues={{ name: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
            alert("Username " + values.name)
        }}
    >
        <Form>
        <h4>Form Validation</h4>
        <div>
            <Field type="text" name="name" placeholder="Enter your name" />
            <ErrorMessage name='name' component="div" />
        </div>

            <button type='submit'>Submit</button>
        </Form>
    </Formik>
  )
}

export default Message

// formik - Formik(useFormik) -> Form -> Field | ErrorMessage