/** @format */

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./features/fetchData/fetchSlice";
import { countMyPosts } from "./features/countPosts/countPostsSlice";
import { createPost } from "./features/poststextonly/postSlice";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import { getPosts } from "./features/posts/postSlice";
import Sound from "./beep/ping-82822.mp3";

const validationSchema = Yup.object({
  pst: Yup.string()
    .required("Field cannot be empty")
    .min(10, "Post must be at least 10 characters"),
});

const NewPostForm = () => {
  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state) => state.posts);

  useEffect(() => {
    if (isSuccess) {
    }
  }, [isSuccess]);

  const handleSubmit = (values, { resetForm }) => {
    values.pst = values.pst.replace(/[&<>"/']/g, (match) => {
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
    dispatch(createPost(values));
    resetForm();
    dispatch(fetchPosts());
    const audio = new Audio(Sound);
    audio.play();
    dispatch(countMyPosts());
  };

  return (
    <Formik
      initialValues={{ pst: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <div className="col-12 mt-1 mb-1">
          <div className="form col-12 mb-0">
            <Form>
              <div className="form-group mb-0 pb-0 ">
                <Field name="pst">
                  {({ field }: FieldProps) => (
                    <div>
                      <textarea
                        id="pst"
                        {...field}
                        style={{
                          backgroundColor: "rgba(0,0,255,.1)",
                          fontSize: "10pt",
                        }}
                        className="p-2"
                      />
                      <div className="errMessage">
                        {errors.pst && touched.pst && <div>{errors.pst}</div>}
                      </div>
                    </div>
                  )}
                </Field>
              </div>

              <div className="form-group mt-0 col-12 m-0 p-0">
                <button
                  className="col-auto btn btn-sm rounded-1 p-1"
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    marginLeft: "auto",
                    marginRight: "0",
                  }}
                >
                  Submit
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default NewPostForm;
