/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { replyMsg, reset } from "./features/messageReply/messageReplySlice";
import { readMessage, getMessage } from "./features/message/messageSlice";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  rep: Yup.string()
    .required("Field cannot be empty")
    .min(2, "Post must be at least 10 characters"),
});

const MessageReplyBox = ({ message }) => {
  const { mid } = useParams();
  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state) => state.msgReplys);

  useEffect(() => {
    if (isSuccess) {
      dispatch(readMessage(`${mid}`));
      dispatch(getMessage());
      dispatch(reset());
    }
  }, [dispatch, isSuccess]);

  const handleSubmit = (values, { resetForm }) => {
    values.rep = values.rep.replace(/[&<>"/']/g, (match) => {
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
    values.msID = message.uniqueID;
    dispatch(replyMsg(values));
    resetForm();
  };

  return (
    <div className="col-12 p-0 m-0">
      <Formik
        initialValues={{ rep: "", msId: message.uniqueID }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <div className="col-12 mt-1 mb-1">
            <div className="form col-12 mb-0">
              <Form>
                <div className="form-group mb-0 pb-0 ">
                  <Field name="rep">
                    {({ field }: FieldProps) => (
                      <div>
                        <textarea
                          id="rep"
                          {...field}
                          style={{ backgroundColor: "rgba(0,0,0,.2)" }}
                        />
                        {errors.rep && touched.rep && <div>{errors.rep}</div>}
                      </div>
                    )}
                  </Field>
                  <Field type="hidden" name="msId" />
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
                    Send
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

export default MessageReplyBox;
