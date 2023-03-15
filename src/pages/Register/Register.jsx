import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInput } from "../../components/custon-input/CustomInput";
import { toast } from "react-toastify";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { Spinner } from "react-bootstrap";

export const Register = () => {
  const [frmDt, setFrmDt] = useState({});

  const [error, setError] = useState("some error!");

  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      setError("");
      value.length < 6 && setError("password is too short");

      !/[0-9]/.test(value) && setError("Must include number");
      !/[A-Z]/.test(value) && setError("Must include Uppercase");
      !/[a-z]/.test(value) && setError("Must include Lowercase");
    }
    setFrmDt({
      ...frmDt,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const { confirmPassword, password, email } = frmDt;
    if (confirmPassword !== password) {
      return toast.error("password do not match!");
    }
    toast.success("password match");

    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...

        setIsLoading(false);
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // ..
      });

    setIsLoading(true);

    console.log(frmDt);
  };

  const inputFields = [
    { label: "First Name", name: "fName", placeholder: "Sam", required: true },

    { label: "Last Name", name: "lName", placeholder: "smith", required: true },

    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Sam@email.com",
      required: true,
    },

    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "********",
      required: true,
    },

    {
      label: "Confirm PassWord",
      type: "password",
      name: "confirmPassword",
      placeholder: "********",
      required: true,
    },
  ];
  return (
    <div className="form-container">
      <Form clasName="border p-5 rounded shadow-lg" onSubmit={handleOnSubmit}>
        <h3>Join our System</h3>

        <hr />

        {inputFields.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}

        <div className="p3">
          <Form.Text>
            Password should be longer than 6 characters contain at least one
            number, one uppercase and one lowercase.
            {error && (
              <ul>
                <li className="text-danger">{error}</li>
              </ul>
            )}
          </Form.Text>
        </div>

        <Button variant="primary" type="submit" disabled={error}>
          {isLoading ? <Spinner animation="border" /> : "submit"}
        </Button>
      </Form>
    </div>
  );
};

export default Register;
