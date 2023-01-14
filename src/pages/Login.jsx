import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { googleSignIn, login } from "../redux/features/authSlice";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => ({ ...state.auth }));

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  let formik = useFormik({
    initialValues: {
      emailId: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};
      if (values.emailId === "") {
        errors.emailId = "Please enter a email Id ";
      }
      if (values.password === "") {
        errors.password = "Password should not be empty";
      }
      return errors;
    },
    onSubmit: (values) => {
      if (values.emailId && values.password) {
        dispatch(login({ values, navigate, toast }));
      }
    },
  });
  return (
    <div className="login-container ">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="login-wrap p-0">
            <h2 className="heading-section text-center">Login</h2>
            <h3 className="mb-4 text-center">Have an account?</h3>
            <form className="signin-form" onSubmit={formik.handleSubmit}>
              <div className="form-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={formik.values.emailId}
                  onChange={formik.handleChange}
                  name="emailId"
                  required
                />
                <span style={{ color: "red" }}>{formik.errors.emailId}</span>
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
              <div className="form-group">
                <button
                  type="submit"
                  className="form-control btn btn-primary px-3"
                >
                  SignIn
                </button>
              </div>
              <div className="mt-3">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    let decoded = jwt_decode(credentialResponse.credential);
                    const email = decoded.email;
                    const name = decoded.name;
                    const token = decoded.jti;
                    const googleId = decoded.sub;
                    const result = { email, name, token, googleId };
                    dispatch(googleSignIn({ result, navigate, toast }));
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
            </form>
            <hr />
            <div className="row justify-content-center">
              <Link to="/signIn">Don't have an account? sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
