/** @format */

import { useState, useEffect } from "react";
import {
  updateProfessionalProfile,
  reset,
} from "./features/proProfile/proProfileSlice";
import { getProfile } from "./features/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  category: Yup.string()
    .required("Select a category")
    .matches(/^[a-zA-Z ]+$/, "Invalid Category Option"),
  experience: Yup.string()
    .required("Select Years of Experience")
    .matches(/^[a-zA-Z0-9- ]+$/, "Invalid experience"),
  about: Yup.string()
    .required("Brief description")
    .min(20, "Post must be at least 10 characters"),
});

const UpdateProfessionalProfileForm = () => {
  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state) => state.proProfiles);

  useEffect(() => {
    if (isSuccess) {
      dispatch(getProfile());
    }
    return () => {
      dispatch(reset());
    };
  });

  const handleSubmit = (values, { resetForm }) => {
    values.about = values.about.replace(/[&<>"/']/g, (match) => {
      switch (match) {
        case "&":
          return "&amp;";
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case '"':
          return "&quot;";
        case "/":
          return "&#x2F;";
        case "'":
          return "&#039;";
        default:
          return match;
      }
    });
    dispatch(updateProfessionalProfile(values));
    dispatch(getProfile());
    dispatch(reset());
    resetForm();
  };

  return (
    <Formik
      initialValues={{ category: "", experience: "", about: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <div className="col-12 p-3">
          <div className="form col-12 mb-0">
            <Form>
              <div className="form-group mb-0 pb-0 ">
                <Field name="category">
                  {({ field }: FieldProps) => (
                    <div className="mb-1">
                      <select
                        id="category"
                        {...field}
                        className="mb-0"
                        placeholder="category"
                        style={{ backgroundColor: "rgba(0,0,255,.1)" }}
                      >
                        <option value="">Preferred Mentorship Category</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Art">Art</option>
                        <option value="Career Development">
                          Career Development
                        </option>
                        <option value="Diversity and Inclusion">
                          Diversity and Inclusion
                        </option>
                        <option value="Education">Education</option>
                        <option value="Entrepreneurship">
                          Entrepreneurship
                        </option>
                        <option value="Environmentalism">
                          Environmentalism
                        </option>
                        <option value="Finance and Investing">
                          Finance and Investing
                        </option>
                        <option value="Health and Wellness">
                          Health and Wellness
                        </option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Leadership">Leadership</option>
                        <option value="Legal">Legal</option>
                        <option value="Music">Music</option>
                        <option value="Personal Development">
                          Personal Development
                        </option>
                        <option value="Relationship">Relationship</option>
                        <option value="Project Management">
                          Project Management
                        </option>
                        <option value="Sales and Marketing">
                          Sales and Marketing
                        </option>
                        <option value="Speaking">Speaking</option>
                        <option value="Technology">Technology</option>
                        <option value="Writing">Writing</option>
                      </select>
                      <div className="errMessage p-0 m-0">
                        {errors.category && touched.category && (
                          <div>{errors.category}</div>
                        )}
                      </div>
                    </div>
                  )}
                </Field>
                <Field name="experience">
                  {({ field }: FieldProps) => (
                    <div className="mb-1">
                      <select
                        id="experience"
                        className="mb-0"
                        placeholder="Experience"
                        {...field}
                        style={{ backgroundColor: "rgba(0,0,255,.1)" }}
                      >
                        <option value="">Years of experience</option>
                        <option value="No experience">No experience</option>
                        <option value="0-1 Year">0-1 Year</option>
                        <option value="2-5 Years">2-5 Years</option>
                        <option value="6-10 Years">6-10 Years</option>
                        <option value="11-20 Years">11-20 Years</option>
                        <option value="Above 20 Years">Above 20 Years</option>
                      </select>
                      <div className="errMessage p-0 m-0">
                        {errors.experience && touched.experience && (
                          <div>{errors.experience}</div>
                        )}
                      </div>
                    </div>
                  )}
                </Field>
                <Field name="about">
                  {({ field }: FieldProps) => (
                    <div className="mb-1">
                      <textarea
                        id="about"
                        rows="6"
                        className="mb-0"
                        placeholder="About"
                        {...field}
                        style={{ backgroundColor: "rgba(0,0,255,.1)" }}
                      />
                      <div className="errMessage p-0 m-0">
                        {errors.about && touched.about && (
                          <div>{errors.about}</div>
                        )}
                      </div>
                    </div>
                  )}
                </Field>
                <Field type="hidden" name="name" />
              </div>

              <div className="form-group mt-0 col-12 m-0 mb-0 p-0">
                <button
                  className="col-auto btn btn-block btn-sm mb-0 rounded-1 p-1"
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    marginLeft: "auto",
                    marginRight: "0",
                  }}
                >
                  Update Profile
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default UpdateProfessionalProfileForm;
