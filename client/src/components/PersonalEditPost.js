/** @format */

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editPost, reset } from "./features/editpost/editPostSlice";
import { toast } from "react-toastify";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import he from "he";
import { useParams } from "react-router-dom";
import { getPersonalPosts } from "./features/posts/postSlice";

const validationSchema = Yup.object({
  editData: Yup.string()
    .required("Field cannot be empty")
    .min(10, "Post must be at least 10 characters"),
});

const PersonalEditPost = ({ post }) => {
  const { isSuccess } = useSelector((state) => state.editPosts);
  const dispatch = useDispatch();
  const decoded = he.decode(post.post);
  const { pid } = useParams();

  useEffect(() => {
    if (isSuccess) {
      dispatch(getPersonalPosts(`${pid}`));

      toast.success("Post Updated");
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isSuccess]);

  const handleSubmit = (values, { resetForm }) => {
    values.editData = values.editData.replace(/[&<>"/']/g, (match) => {
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
    values.pid = post.id;
    dispatch(editPost(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ editData: decoded, pid: post.id }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <div className="col-12 mt-1 mb-1">
          <div className="form col-12 mb-0">
            <Form>
              <div className="form-group mb-0 pb-0 ">
                <Field name="editData">
                  {({ field }: FieldProps) => (
                    <div>
                      <input
                        id="editData"
                        {...field}
                        style={{
                          backgroundColor: "rgba(0,0,0,.05)",
                          fontSize: "9pt",
                        }}
                      />
                      {errors.editData && touched.editData && (
                        <div>{errors.editData}</div>
                      )}
                    </div>
                  )}
                </Field>
                <Field type="hidden" name="pid" />
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

    // <div>
    //     <div className="form col-12 mb-0">
    //         <form onSubmit={onSubmit}>
    //             <div className="form-group">
    //             <input
    //                 type="text"
    //                 id="editPost"
    //                 className="form-control"
    //                 style={{fontSize: "10pt"}}
    //                 value={decoded}
    //                 onChange={(e) => setEditData(e.target.value)}
    //             />
    //             </div>
    //             <div className="form-group">
    //                 <button className="btn btn-sm btn-block p-0"
    //                 onClick={(e) => setPid(post.id)}>
    //                     Update Post
    //                 </button>
    //             </div>
    //         </form>
    //     </div>
    // </div>
  );
};

export default PersonalEditPost;
