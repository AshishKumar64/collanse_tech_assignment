import React from "react";
import { Form, Formik, Field, FieldArray } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import { register, updateUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

import Error from "../sharedComponents/Error";
import { registerValidationSchema } from "../utils/helper";

const initialValue = {
  name: "",
  dob: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  address: [""],
};

const Register = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(initialValue);
  const user = useSelector((state) => state?.users?.updateValue);

  return (
    <div className="content">
      <h1>Registeration Form</h1>
      <div className="form">
        <Formik
          initialValues={user || value}
          validationSchema={registerValidationSchema}
          enableReinitialize
          onSubmit={(value, { resetForm, setSubmitting }) => {
            const payload = { ...value, id: Date.now().toString() };

            if (!user) {
              dispatch(register(payload));
            } else {
              dispatch(updateUser({ ...value }));
            }
            setSubmitting(false);
            resetForm();
          }}
        >
          {(props) => {
            return (
              <Form>
                <label>Name</label>
                <br />
                <Field name="name" type="text" placeholder="Name" /> <br />
                <Error name="name" />
                <br />
                <label>Date Of Birth</label>
                <br />
                <Field
                  placeholder="Date Of Birth"
                  name="dob"
                  type="date"
                  value={props.values.dob}
                  max={new Date().toISOString().split("T")[0]}
                />
                <Error name="dob" />
                <br />
                <label>Phone Number</label>
                <br />
                <Field
                  name="phoneNumber"
                  type="number"
                  placeholder="Phone Number"
                />
                <Error name="phoneNumber" />
                <br />
                <label>Address</label>
                <FieldArray name="address">
                  {(fieldArrayProps) => {
                    const {
                      push,
                      remove,
                      form: {
                        values: { address },
                      },
                    } = fieldArrayProps;

                    return (
                      <>
                        {address?.map((addres, index) => (
                          <>
                            <div key={index} className="flex-row">
                              <Field
                                name={`address[${index}]`}
                                type="text"
                                placeholder="Address"
                              />
                              {index > 0 && (
                                <button
                                  className="sign_button minus"
                                  type="button"
                                  onClick={() => remove(index)}
                                >
                                  -
                                </button>
                              )}
                              {index == 0 && (
                                <button
                                  className="sign_button plus"
                                  type="button"
                                  onClick={() => push("")}
                                >
                                  +
                                </button>
                              )}
                            </div>
                            <Error name={`address[${index}]`} />
                          </>
                        ))}
                      </>
                    );
                  }}
                </FieldArray>
                <br />
                <label>Password</label>
                <br />
                <Field name="password" type="password" placeholder="Password" />
                <Error name="password" />
                <br />
                <label>Confirm Password</label>
                <br />
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                />
                <Error name="confirmPassword" />
                <br />
                <button className="button submit" type="submit">
                  {user ? "Update" : "Submit"}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
