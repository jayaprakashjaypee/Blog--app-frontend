import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { register } from "../redux/features/authSlice";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => ({ ...state.auth }));

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  let formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      let errors = {};
      if (values.email === "") {
        errors.email = "Please enter a email Id ";
      }
      if (values.password === "") {
        errors.password = "Password should not be empty";
      }
      return errors;
    },
    onSubmit: (values) => {
      if (values.password !== values.confirmPassword) {
        return toast.error("Password should  match");
      }
      if (
        values.email &&
        values.password &&
        values.firstName &&
        values.lastName &&
        values.confirmPassword
      ) {
        dispatch(register({ values, navigate, toast }));
      }
    },
  });
  return (
    <div className="login-container ">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="login-wrap p-0">
            <h2 className="heading-section text-center">SignUp</h2>
            <form className="signin-form" onSubmit={formik.handleSubmit}>
              <div className="form-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  name="firstName"
                  required
                />
                {/* <span style={{ color: "red" }}>{formik.errors.emailId}</span> */}
              </div>
              <div className="form-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  name="lastName"
                  required
                />
                {/* <span style={{ color: "red" }}>{formik.errors.emailId}</span> */}
              </div>
              <div className="form-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  name="email"
                  required
                />
                <span style={{ color: "red" }}>{formik.errors.email}</span>
              </div>
              <div className="form-group mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  name="password"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  name="confirmPassword"
                  required
                />
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="form-control btn btn-primary px-3"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <hr />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
