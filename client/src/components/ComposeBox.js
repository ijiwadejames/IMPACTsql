/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { sendMessage, reset } from "./features/message/messageSlice";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  messageSubject: Yup.string()
    .required("Enter message subject")
    .matches(/^[a-zA-Z ]+$/, "Invalid Subject"),
  messageBody: Yup.string()
    .required("Content is required")
    .min(10, "Post must be at least 10 characters"),
});

const ComposeBox = ({ profile }) => {
  const [toggleMessageBox, setToggleMessageBox] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.messages
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess) {
      toast.success("Message Sent");
    }
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, isSuccess]);

  const handleSubmit = (values, { resetForm }) => {
    values.messageBody = values.messageBody.replace(/[&<>"/']/g, (match) => {
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
    values.receiverID = profile.id;
    dispatch(sendMessage(values));
    navigate("/dashboard");
    dispatch(reset());
    resetForm();
  };

  return (
    <div className="col-12 bg-light p-2">
      <Formik
        initialValues={{
          messageSubject: "",
          messageBody: "",
          receiverID: profile.id,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <div className="col-12 mt-1 mb-1">
            <div className="form col-12 mb-0">
              <Form>
                <div className="form-group mb-0 pb-0 ">
                  <Field name="messageSubject">
                    {({ field }: FieldProps) => (
                      <div className="mb-1">
                        <input
                          id="messageSubject"
                          {...field}
                          className="mb-0"
                          placeholder="messageSubject"
                          style={{ backgroundColor: "rgba(0,0,0,.2)" }}
                        />
                        <div className="errMessage p-0 m-0">
                          {errors.messageSubject && touched.messageSubject && (
                            <div>{errors.messageSubject}</div>
                          )}
                        </div>
                      </div>
                    )}
                  </Field>
                  <Field name="messageBody">
                    {({ field }: FieldProps) => (
                      <div className="mb-1">
                        <textarea
                          id="messageBody"
                          rows="15"
                          className="mb-0"
                          placeholder="Message content"
                          {...field}
                          style={{ backgroundColor: "rgba(0,0,0,.2)" }}
                        />
                        <div className="errMessage p-0 m-0">
                          {errors.messageBody && touched.messageBody && (
                            <div>{errors.messageBody}</div>
                          )}
                        </div>
                      </div>
                    )}
                  </Field>
                  <Field type="hidden" name="receiverID" />
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
                    Send to {profile.firstname}
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

export default ComposeBox;
