import React, { FC, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Formik, Field, FormikProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../service/index.service";
import { Link, useNavigate } from 'react-router-dom';

interface FormValues {
  email: string;
  password: string;
}

const Login: FC = () => {
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    // Handle form submission
    const submit = await loginUser(values);
    console.log(submit)
    setSuccess(submit.message);
    setSubmitting(false);
    navigate('/');
    navigate(0);
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Log In</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your account details to get started. Never seen this before? <Link to={'/register'}>Register instead</Link>
        </p>
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }: FormikProps<FormValues>) => (
          <Form className="space-y-4" onSubmit={handleSubmit}>
            {success && (
              <div
                className="text-green-500 "
                style={{
                  textAlign: "center",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  backgroundColor: "#f0f0f0",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                }}
              >
                {success}
              </div>
            )}
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Field type="email" name="email" as={Form.Control} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Field type="password" name="password" as={Form.Control} />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-full">
              Sign In
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;