/** @format */

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { faUserPlus, faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../components/css/myCss.css";
import { sendMail } from "../components/features/processMessage/processMessageSlice";
import { register, logout, reset } from "../components/features/auth/authSlice";
import Spinner from "../components/Spinner";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import background from "../components/images/social.jpg";
import Typewriter from "../components/Typewriter";

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .trim()
    .matches(/^[a-zA-Z0-9]+$/, "Invalid entry")
    .min(6, "Minimum length is 6 characters"),
  firstname: Yup.string()
    .required("Firstname is required")
    .trim()
    .matches(/^[a-zA-Z]+$/, "Invalid entry"),
  lastname: Yup.string()
    .required("Lastname is required")
    .trim()
    .matches(/^[a-zA-Z]+$/, "Invalid entry"),
  // othernames: Yup.string()
  //   .required("Othername is required")
  //   .matches(/^[a-zA-Z0-9]+$/, "Invalid entry"),
  gender: Yup.string()
    .required("Gender is required")
    .trim()
    .matches(/^[a-zA-Z0-9]+$/, "Invalid entry"),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required")
    .trim(),
  dobD: Yup.string()
    .required("Required")
    .trim()
    .matches(/^[0-9]+$/, "Invalid entry")
    .max(2, "Invalid Day"),
  dobM: Yup.string()
    .required("Required")
    .trim()
    .matches(/^[a-zA-Z]+$/, "Invalid entry")
    .max(9, "Invalid Month"),
  dobY: Yup.string()
    .required("Required")
    .trim()
    .matches(/^[0-9]+$/, "Invalid entry")
    .max(4, "Invalid Year"),
  password: Yup.string()
    .required("Password is required")
    .trim()
    .matches(/^[a-zA-Z0-9!.]+$/, "Invalid entry")
    .min(6, "Minimum length is 6 characters"),
  confirmPassword: Yup.string()
    .required("Password is required")
    .trim()
    .matches(/^[a-zA-Z0-9!.]+$/, "Invalid entry")
    .min(6, "Minimum length is 6 characters"),
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const sentences = [
    "IMPACTVerse builds ",
    "* Sound and enlightened Professionals in:",
    "Entrepreneurship, Writing, Speaking",
    "Communications and more...",
  ];
  const handleSubmit = (values, { resetForm }) => {
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      dispatch(register(values));
      // dispatch(sendMail(values));
      dispatch(reset());
      // resetForm();
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(logout());
      navigate("/reg-success");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

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
              Join IMPACTVerse
            </div>
            <div className="p-2">
              <Formik
                initialValues={{
                  username: "",
                  firstname: "",
                  lastname: "",
                  // othernames: "",
                  dobD: "",
                  dobM: "",
                  dobY: "",
                  gender: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <div className="col-12">
                    <div className="form col-12 mb-0">
                      <Form>
                        <div className="form-group mb-0 pb-0 ">
                          <span
                            className="text-danger"
                            style={{ fontSize: "9pt" }}
                          >
                            all fields are required
                          </span>
                          <Field name="username">
                            {({ field }: FieldProps) => (
                              <div className="mb-1">
                                <input
                                  id="username"
                                  type="search"
                                  {...field}
                                  className="mb-0 p-2"
                                  placeholder="Username"
                                  style={{
                                    fontSize: "9pt",
                                    backgroundColor: "rgba(0,0,0,.05)",
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
                          <Field name="lastname">
                            {({ field }: FieldProps) => (
                              <div className="mb-1">
                                <input
                                  id="lastname"
                                  type="search"
                                  {...field}
                                  className="mb-0 p-2"
                                  placeholder="Last Name"
                                  style={{
                                    fontSize: "9pt",
                                    backgroundColor: "rgba(0,0,0,.05)",
                                  }}
                                />
                                <div className="errMessage p-0 m-0">
                                  {errors.lastname && touched.lastname && (
                                    <div>{errors.lastname}</div>
                                  )}
                                </div>
                              </div>
                            )}
                          </Field>
                          <Field name="firstname">
                            {({ field }: FieldProps) => (
                              <div className="mb-1">
                                <input
                                  id="firstname"
                                  type="search"
                                  {...field}
                                  className="mb-0 p-2"
                                  placeholder="First Name"
                                  style={{
                                    fontSize: "9pt",
                                    backgroundColor: "rgba(0,0,0,.05)",
                                  }}
                                />
                                <div className="errMessage p-0 m-0">
                                  {errors.firstname && touched.firstname && (
                                    <div>{errors.firstname}</div>
                                  )}
                                </div>
                              </div>
                            )}
                          </Field>

                          {/* <Field name="othernames">
                          {({ field }: FieldProps) => (
                            <div className="mb-1">
                              <input
                                id="othernames"
                                 type="search"
                                {...field}
                                className="mb-1"
                                placeholder="Other Names"
                                style={{
                                  fontSize: "9pt",
                                  backgroundColor: "rgba(0,0,0,.05)",
                                }}
                              />
                              <div className="errMessage p-0 m-0">
                                {errors.othernames && touched.othernames && (
                                  <div>{errors.othernames}</div>
                                )}
                              </div>
                            </div>
                          )}
                        </Field> */}
                          <div className="status-bar-items">
                            <Field name="dobD">
                              {({ field }: FieldProps) => (
                                <div className="mb-1">
                                  <select
                                    id="dobD"
                                    {...field}
                                    className="mb-0 p-2"
                                    placeholder="dobD"
                                    style={{
                                      fontSize: "9pt",
                                      backgroundColor: "rgba(0,0,0,.05)",
                                    }}
                                  >
                                    <option value="">Day</option>
                                    <option value="01">1</option>
                                    <option value="02">2</option>
                                    <option value="03">3</option>
                                    <option value="04">4</option>
                                    <option value="05">5</option>
                                    <option value="06">6</option>
                                    <option value="07">7</option>
                                    <option value="08">8</option>
                                    <option value="09">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                                  </select>
                                  <div className="errMessage p-0 m-0">
                                    {errors.dobD && touched.dobD && (
                                      <div>{errors.dobD}</div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </Field>

                            <Field name="dobM">
                              {({ field }: FieldProps) => (
                                <div className="mb-1">
                                  <select
                                    id="dobM"
                                    {...field}
                                    className="mb-0 p-2"
                                    placeholder="dobM"
                                    style={{
                                      fontSize: "9pt",
                                      backgroundColor: "rgba(0,0,0,.05)",
                                    }}
                                  >
                                    <option>Month</option>
                                    <option value="January">January</option>
                                    <option value="February">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
                                  </select>
                                  <div className="errMessage p-0 m-0">
                                    {errors.dobM && touched.dobM && (
                                      <div>{errors.dobM}</div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </Field>

                            <Field name="dobY">
                              {({ field }: FieldProps) => (
                                <div className="mb-1">
                                  <select
                                    id="dobY"
                                    {...field}
                                    className="mb-0 p-2"
                                    placeholder="dobY"
                                    style={{
                                      fontSize: "9pt",
                                      backgroundColor: "rgba(0,0,0,.05)",
                                    }}
                                  >
                                    <option value="">Year</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                  </select>
                                  <div className="errMessage p-0 m-0">
                                    {errors.dobY && touched.dobY && (
                                      <div>{errors.dobY}</div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </Field>
                          </div>
                          <Field name="gender">
                            {({ field }: FieldProps) => (
                              <div className="mb-1">
                                <select
                                  id="gender"
                                  {...field}
                                  className="mb-0 p-2"
                                  placeholder="Gender"
                                  style={{
                                    fontSize: "9pt",
                                    backgroundColor: "rgba(0,0,0,.05)",
                                  }}
                                >
                                  <option>Select Gender</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  {/* <option value="Prefer not to say">Prefer not to say</option> */}
                                </select>
                                <div className="errMessage p-0 m-0">
                                  {errors.gender && touched.gender && (
                                    <div>{errors.gender}</div>
                                  )}
                                </div>
                              </div>
                            )}
                          </Field>

                          <Field name="email">
                            {({ field }: FieldProps) => (
                              <div className="mb-1">
                                <input
                                  id="email"
                                  type="search"
                                  {...field}
                                  className="mb-0 p-2"
                                  placeholder="abc@example.com"
                                  style={{
                                    fontSize: "9pt",
                                    backgroundColor: "rgba(0,0,0,.05)",
                                  }}
                                />

                                <div className="errMessage p-0 m-0">
                                  {errors.email && touched.email && (
                                    <div>{errors.email}</div>
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
                                  rows="15"
                                  className="mb-0 p-2"
                                  type="password"
                                  placeholder="Password"
                                  {...field}
                                  style={{
                                    fontSize: "9pt",
                                    backgroundColor: "rgba(0,0,0,.05)",
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

                          <Field name="confirmPassword">
                            {({ field }: FieldProps) => (
                              <div className="mb-1">
                                <input
                                  id="confirmPassword"
                                  rows="15"
                                  className="mb-0 p-2"
                                  type="password"
                                  placeholder="Confirm Password"
                                  {...field}
                                  style={{
                                    fontSize: "9pt",
                                    backgroundColor: "rgba(0,0,0,.05)",
                                  }}
                                />
                                <div className="errMessage p-0 m-0">
                                  {message}{" "}
                                  {errors.confirmPassword &&
                                    touched.confirmPassword && (
                                      <div>{errors.confirmPassword}</div>
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
                            disabled={isSubmitting}
                            style={{
                              marginLeft: "auto",
                              marginRight: "0",
                            }}
                          >
                            {isSubmitting ? "please wait..." : "Get Started"}
                          </button>
                        </div>
                      </Form>
                    </div>
                  </div>
                )}
              </Formik>
            </div>
            <div className="body-content p-2">
              <div className="left-bar" style={{ fontSize: "8pt" }}>
                Forgot password
              </div>

              <div className="right-bar" style={{ fontSize: "8pt" }}>
                <Link to="/login">
                  Login <FontAwesomeIcon icon={faUserPlus} />
                </Link>
              </div>
            </div>
          </div>

          {/* <span className="line">
            Already registered?
            <Link to="/" className="text-decoration-none">
              Sign In
            </Link>
          </span> */}
        </div>
      </div>
    </div>
  );
};
export default Register;
