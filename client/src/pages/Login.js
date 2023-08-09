/** @format */

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  faSignIn,
  faSmile,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { login, reset } from "../components/features/auth/authSlice";
import background from "../components/images/social.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../components/Spinner";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import Typewriter from "../components/Typewriter";

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .matches(/^[a-zA-Z0-9]+$/, "Invalid entry"),
  password: Yup.string()
    .required("Password is required")
    .trim()
    .matches(/^[a-zA-Z0-9!.]+$/, "Invalid entry"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const sentences = [
    "Welcome to IMPACTVerse",
    "*'Find' and 'Connect' with a Mentor",
    "*Learn by asking and interacting",
  ];

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/dashboard");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = (values, { resetForm }) => {
    dispatch(login(values));
    // dispatch(getProfile());
    dispatch(reset());
    // resetForm();
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container-fluid align-div-center p-0 m-0">
      <div
        className="body-content col-12 m-0 p-0"
        style={{
          height: "97vh",
          background: `url(${background})`,
          fontSize: "18pt",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="hide font-sixteen col-md-6 col-lg-8 text-dark m-auto p-1 fw-semibold align-div-center">
          <Typewriter sentences={sentences} />
        </div>

        <div
          className="col-12 col-md-6 col-lg-4 m-auto shadow align-div-center"
          style={{
            height: "97vh",
            backgroundColor: "rgba(230, 230, 230, 0.1)",
          }}
        >
          <div className="col-8 bg-white shadow-sm rounded-1 border-1">
            <div
              className="bg-dark col-12 m-0 p-1 text-light text-center fw-semibold rounded-1"
              style={{
                background: `url(${background})`,
                fontSize: "10pt",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              Login to IMPACTVerse
            </div>
            <div className="text-center fs-6 fw-semibold m-2">
              Welcome back!
              <FontAwesomeIcon
                style={{ color: "yellowgreen" }}
                icon={faSmile}
              />
            </div>
            <div className="col-12 bg-light p-2">
              <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <div className="col-12 mt-1 mb-1">
                    <div className="form col-12 mb-0">
                      <Form>
                        <div className="form-group mb-0 pb-0 ">
                          <Field name="username">
                            {({ field }: FieldProps) => (
                              <div className="mb-1">
                                <input
                                  type="search"
                                  id="username"
                                  {...field}
                                  className="mb-0 p-2"
                                  placeholder="Username"
                                  style={{
                                    backgroundColor: "rgba(0,0,0,.05)",
                                    fontSize: "9pt",
                                  }}
                                />
                                <div className="errMessage p-0 m-0">
                                  {errors.username && touched.username && (
                                    <div>{errors.username}</div>
                                  )}
                                </div>
                              </div>
                            )}
                          </Field>
                          <Field name="password">
                            {({ field }: FieldProps) => (
                              <div className="mb-1">
                                <input
                                  id="password"
                                  type="password"
                                  className="mb-0 p-2"
                                  placeholder="Password"
                                  {...field}
                                  style={{
                                    backgroundColor: "rgba(0,0,0,.05)",
                                    fontSize: "9pt",
                                  }}
                                />
                                <div className="errMessage p-0 m-0">
                                  {errors.password && touched.password && (
                                    <div>{errors.password}</div>
                                  )}
                                </div>
                              </div>
                            )}
                          </Field>
                        </div>

                        <div className="form-group mt-0 col-12 m-0 mb-0 p-0">
                          <button
                            className="col-auto btn btn-block btn-sm mb-0 rounded-1 p-2"
                            type="submit"
                            disabled={isLoading}
                            style={{
                              marginLeft: "auto",
                              marginRight: "0",
                            }}
                          >
                            {isLoading ? "please wait..." : "Login"}
                          </button>
                        </div>
                      </Form>
                    </div>
                  </div>
                )}
              </Formik>
            </div>
            <div className="body-content p-2">
              <div className="color left-bar" style={{ fontSize: "8pt" }}>
                Forgot password
              </div>

              <div className="color right-bar" style={{ fontSize: "8pt" }}>
                <Link to="/register">
                  Register <FontAwesomeIcon icon={faUserPlus} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};
export default Login;
