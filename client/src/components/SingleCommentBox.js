/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { replyComment, reset } from "./features/reply/replySlice";
import { singlePost } from "../components/features/singlePost/singlePostSlice";
import Spinner from "./Spinner";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import {useParams} from "react-router-dom";

const validationSchema = Yup.object({
  comment: Yup.string()
    .required("Field cannot be empty")
    .min(2, "Post must be at least 2 characters"),
});

const CommentBox = ({ post }) => {
  const { replys, isSuccess, isLoading } = useSelector((state) => state.replys);
  const {pstId} = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(singlePost(`${pstId}`)); 

      dispatch(reset());
    }
  }, [dispatch, isSuccess]);

  const handleSubmit = (values, { resetForm }) => {
    values.comment = values.comment.replace(/[&<>"/']/g, (match) => {
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
    values.psId = post.id;
    dispatch(replyComment(values));
    resetForm();
  };

  return (
    <div className="col-11 p-0 m-auto">
      <Formik
        initialValues={{ comment: "", psId: post.id }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <div className="col-12 mt-1 mb-1">
            <div className="form col-12 mb-0">
              <Form>
                <div className="form-group mb-0 pb-0 ">
                  <Field name="comment">
                    {({ field }: FieldProps) => (
                      <div>
                        <textarea
                          id="comment"
                          rows="1"
                          placeholder="leave a comment"
                          className="mb-0"
                          {...field}
                          style={{ backgroundColor: "rgba(0,0,255,.1)" }}
                        />
                        <div className="errMessage">
                          {errors.comment && touched.comment && (
                            <div>{errors.comment}</div>
                          )}
                        </div>
                      </div>
                    )}
                  </Field>
                  <Field type="hidden" name="psId" />
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
    </div>
  );
};

export default CommentBox;
