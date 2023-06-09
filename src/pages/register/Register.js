import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { toast } from "react-toastify";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase-config";
import { doc, setDoc } from "firebase/firestore";

const initialState = {
  password: "Aa12345",
  confirmPassword: "Aa12345",
};

const Register = () => {
  const [frmDt, setFrmDt] = useState(initialState);
  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      setError("");
      value.length < 6 && setError("Password is too short");

      !/[0-9]/.test(value) && setError("Must include number");
      !/[A-Z]/.test(value) && setError("Must include uppercase");
      !/[a-z]/.test(value) && setError("Must include lowercase");
    }

    setFrmDt({
      ...frmDt,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();

      const { confirmPassword, password, email } = frmDt;

      if (confirmPassword !== password) {
        return toast.error("Password do not match!");
      }

      // user firebase auth service to create user auth account

      const pendingState = createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.promise(pendingState, {
        pending: "Please wait ..",
      });

      const { user } = await pendingState;
      console.log(user.uid);
      if (user?.uid) {
        // user is registered, now let's add them in our database for the future purpose

        const userObj = {
          fName: frmDt.fName,
          lName: frmDt.lName,
          email: frmDt.email,
        };

        await setDoc(doc(db, "users", user.uid), userObj);
        toast.success("User has been registered. You may login now");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const inputFields = [
    { label: "First Name", name: "fName", placeholder: "Sam", required: true },

    { label: "Last Name", name: "lName", placeholder: "Smith", required: true },
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Smith@emial.com",
      required: true,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "*****",
      required: true,
      value: frmDt.password,
    },
    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      placeholder: "*****",
      required: true,
      value: frmDt.confirmPassword,
    },
  ];

  return (
    <div className="form-container">
      <Form onSubmit={handleOnSubmit} className="border p-5 rounded shadow-lg">
        <h3>Join Our Syste</h3>
        <hr />

        {inputFields.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}
        <div className="p3">
          <Form.Text>
            Password should be longer than 6 charcters contain at least one
            number, one uppercase and one lowercase.
            {error && (
              <ul>
                <li className="text-danger fw-bolder">{error}</li>
              </ul>
            )}
          </Form.Text>
        </div>
        <Button variant="primary" type="submit" disabled={error}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
