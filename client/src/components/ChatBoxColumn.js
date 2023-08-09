/** @format */
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { sendMessage, reset } from "./features/message/messageSlice";
import { getMessage } from "./features/message/messageSlice";
import { readMessage } from "./features/getChatMessage/getChatMessageSlice";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faArrowCircleRight,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const validationSchema = Yup.object({
  messageBody: Yup.string()
    .required("Content is required")
    .min(10, "Post must be at least 10 characters"),
});

const ChatBoxColumn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pid } = useParams();

  const { isSuccess } = useSelector((state) => state.chatMsgs);

  useEffect(() => {
    if (isSuccess) {
      dispatch(readMessage(`${pid}`));
    }
  }, [dispatch, isSuccess]);

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
    values.receiverID = pid;
    dispatch(sendMessage(values));
    dispatch(reset());
    dispatch(readMessage(`${pid}`));
    dispatch(getMessage());
    resetForm();
  };

  return (
    <div style={{ marginTop: "auto", marginBottom: "0" }}>
      <Formik
        initialValues={{ messageBody: "", receiverID: pid }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          // <div className="chat-body">
          <Form className="chat-body">
            {/* <div className="chat-title"> */}
            <Field name="messageBody" className="chat-title">
              {({ field }: FieldProps) => (
                <div className="col-11">
                  <input
                    id="messageBody"
                    className="col-12 border-0 rounded-1 p-1"
                    placeholder="...drop a message"
                    {...field}
                    style={{
                      backgroundColor: "rgba(0,0,255,.1)",
                      fontSize: "10px",
                    }}
                  />
                  <div className="errMessage">
                    {errors.messageBody && touched.messageBody && (
                      <div>{errors.messageBody}</div>
                    )}
                  </div>
                </div>
              )}
            </Field>
            <Field type="hidden" name="receiverID" />
            {/* </div> */}

            {/* <div> */}
            <button
              type="submit"
              className="m-0 p-0 chat-submit border-0"
              style={{
                marginLeft: "auto",
                marginRight: "0",
                backgroundColor: "none",
              }}
            >
              <FontAwesomeIcon
                // className=""
                icon={faArrowAltCircleRight}
              />
            </button>
          </Form>
          // </div>
        )}
      </Formik>
    </div>
  );
};

export default ChatBoxColumn;
