import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ id: "", password: "" });
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";

    if (name === "id") {
      if (!value) {
        error = "ID is required";
      } else if (!/^VTS202\d{4}$/.test(value)) {
        error = "Invalid Employee ID";
      }
    }

    if (name === "password") {
      if (!value) {
        error = "Password is required";
      } else if (!/^.{6,}$/.test(value)) {
        error = "Minimum 6 characters";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    return error === "";
  };

  const validateAllFields = () => {
    const isIdValid = validateField("id", id);
    const isPasswordValid = validateField("password", password);

    return isIdValid && isPasswordValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "id") {
      setId(value);
    } else if (name === "password") {
      setPassword(value);
    }
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateAllFields()) {
      console.log("Form submitted with:", { id, password });
      const url = `${process.env.REACT_APP_BACKEND_URL}/emp/login`;
      const creds = {
        empId: id,
        password: password,
      };
      axios
        .post(url, creds)
        .then((res) => {
          if (!res.data[0]) {
            toast.error("Invalid Credentials !", { position: "top-center" });
            return;
          }
          console.log("the user data ", res.data[0]);
          navigate("/dashboard", { state: res.data[0] });
        })
        .catch((err) => alert("Invalid Credentials"));
    }
  };

  return (
    <>
      <div className="login-main">
        <div className="Payslip-SignUp">
          <ToastContainer />
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              style={{ height: "40px", width: "40px" }}
              src="https://res.cloudinary.com/drqiw6wyl/image/upload/v1722853169/e1mki1ies2t0ttrypbra.jpg"
              alt="Logo"
            />
            <h2 className="login-name">Login</h2>
          </div>
          <form onSubmit={handleSubmit} className="credentials">
            <div>
              <input
                type="text"
                name="id"
                placeholder="ID"
                value={id}
                onChange={handleChange}
              />
              {errors.id && (
                <p style={{ color: "red", margin: "0px 0px 0px 10px" }}>
                  {errors.id}
                </p>
              )}
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
              {errors.password && (
                <p style={{ color: "red", margin: "0px 0px 0px 10px" }}>
                  {errors.password}
                </p>
              )}
              <a href="reset-password">
                <p style={{ marginLeft: "20px " }}>Forgot Password?</p>
              </a>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
