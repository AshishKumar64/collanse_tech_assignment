import React from "react";
import { ErrorMessage } from "formik";
const Error = ({ name }) => {
  return (
    <div className="error">
      <ErrorMessage name={name} />
    </div>
  );
};
export default Error;
