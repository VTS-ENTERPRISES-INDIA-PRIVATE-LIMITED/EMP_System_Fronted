import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ id: "", password: "" });
  const navigate = useNavigate();

  const validate = () => {
    let valid = true;
    const newErrors = { id: "", password: "" };
    const verifyId = /^VTS202\d{4}$/.test(id)
    const verifyPswd = /^.{6,}$/.test(password)
    if (!id) {
      newErrors.id = "ID is required";
      valid = false;
    } else {
      if (!verifyId) {
        newErrors.id = "Invalid Empolyee ID";
        valid = false;
      }
    }
    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else {
      if (!verifyPswd) {
        newErrors.password = "Minimum 6 characters"
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
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
                placeholder="ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())}
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
