import axios from "axios";
import React, { useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import { motion } from "framer-motion";
const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorList, setErrorList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: 0,
  });

  const getUserData = (e) => {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let validationResult = validateRegisterForm(user);
    console.log(validationResult);
    if (validationResult.error) {
      setIsLoading(false);
      setErrorList(validationResult.error.details);
    } else {
      let { data } = await axios.post(
        "https://route-egypt-api.herokuapp.com/signup",
        user
      );

      if (data.message === "success") {
        setIsLoading(false);
        navigate("/login");
      } else {
        setError(data.message);
        setIsLoading(false);
      }
    }
  };

  const validateRegisterForm = (user) => {
    const schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(8).required(),
      last_name: Joi.string().alphanum().min(3).max(8).required(),
      age: Joi.number().min(16).max(80).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().pattern(/^[A-Z][a-z]{3,8}$/),
    });
    return schema.validate(user, { abortEarly: false });
  };

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="mt-3">Register Now</h2>
      <Form className="mt-3" onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>First_name:</Form.Label>
          <Form.Control onChange={getUserData} type="text" name="first_name" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last_name: </Form.Label>
          <Form.Control onChange={getUserData} type="text" name="last_name" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email: </Form.Label>
          <Form.Control onChange={getUserData} type="email" name="email" />
        </Form.Group>
        <Form.Group className="mb-3 position-relative">
          <Form.Label>Password: </Form.Label>
          <Form.Control
            onChange={getUserData}
            type={!showPassword ? "password" : "text"}
            name="password"
          />
          {!showPassword && (
            <i
              onClick={handlePassword}
              className="fa-solid fa-eye-slash position-absolute hidePassword text-dark"
            ></i>
          )}
          {showPassword && (
            <i
              onClick={handlePassword}
              className="fa-solid fa-eye position-absolute hidePassword text-dark"
            ></i>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Age: </Form.Label>
          <Form.Control onChange={getUserData} type="age" name="age" />
        </Form.Group>

        {errorList &&
          errorList.map((err, index) => {
            if (index === 4) {
              return (
                <Alert variant="danger" key={index} className="m-0 mt-4 mb-2">
                  Invalid Password
                </Alert>
              );
            } else {
              return (
                <Alert variant="danger" key={index} className="m-0 mt-4 mb-2">
                  {err.message}
                </Alert>
              );
            }
          })}
        {error && (
          <Alert variant="danger" className="m-0 mt-4 mb-2">
            {error}
          </Alert>
        )}
        <Button
          type="submit"
          variant="outline-primary"
          className="text-white d-flex align-items-center"
        >
          Register
          {isLoading && <Spinner animation="grow" />}
        </Button>
      </Form>
    </motion.div>
  );
};

export default Register;
