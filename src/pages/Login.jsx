import axios from "axios";
import React, { useContext, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Joi from "joi";
import { motion } from "framer-motion";
import { AuthContext } from "../context/auth/AuthContext";

const Login = () => {
  const { getUserData } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorList, setErrorList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const redrirectPath = location.state?.path || "/";

  const getUserInputs = (e) => {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let validationResult = validateRegisterForm(user);
    if (validationResult.error) {
      setIsLoading(false);
      setErrorList(validationResult.error.details);
    } else {
      axios
        .post("https://route-egypt-api.herokuapp.com/signin", user)
        .then((res) => {
          if (res.data.message === "success") {
            setIsLoading(false);
            localStorage.setItem("userToken", JSON.stringify(res.data.token));
            getUserData();
            navigate(redrirectPath, { replace: true });
          } else {
            setError(res.message);
            setIsLoading(false);
          }
        });
    }
  };

  const validateRegisterForm = (user) => {
    const schema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().pattern(/[A-Z][a-z]{3,8}$/),
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
      <h2 className="mt-3">Login Now</h2>
      <Form className="mt-3" onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Email: </Form.Label>
          <Form.Control onChange={getUserInputs} type="email" name="email" />
        </Form.Group>
        <Form.Group className="mb-3 position-relative">
          <Form.Label>Password: </Form.Label>
          <Form.Control
            onChange={getUserInputs}
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

        {errorList &&
          errorList.map((err, index) => {
            console.log(index);
            if (index === 1) {
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
          Login
          {isLoading && <Spinner animation="grow" />}
        </Button>
      </Form>
    </motion.div>
  );
};

export default Login;
