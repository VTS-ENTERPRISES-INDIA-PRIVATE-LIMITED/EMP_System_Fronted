import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ id: "", password: "" });
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate();


  useEffect(() => {
    if (Cookies.get('employee')) {
      console.log("Already logged in ", JSON.parse(Cookies.get('employee')));
      navigate("/dashboard", { state: JSON.parse(Cookies.get('employee')) });
    }
    else{
      console.log("Bad Luck Next time")
    }
  });
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
      setId(value.trim());
    } else if (name === "password") {
      setPassword(value.trim());
    }
    validateField(name, value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateAllFields()) {
      setIsLoading(true)
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
          // console.log("the user data ", res.data[0]);
          localStorage.setItem('lastlogin',getCurrentTime())
          Cookies.set('employee',JSON.stringify(res.data[0]))
          navigate("/dashboard", { state: res.data[0] });
        })
        .catch((err) => alert("Invalid Credentials"));
    }
  };

  const getCurrentTime =()=> {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
  
    return `${hours}:${minutesFormatted} ${ampm}`;
  }
  
  return (
    <>
      <div
        style={{
          
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent:"center",
          padding:"13vh",
          // margin: "15vh 10vw 0 10vw",
          alignContent: "center",
          position:"absolute",
          top:0,
          backgroundColor:"white",
          left:0
        }}
        className="login-page-main-container"
      >
        <div
          style={{
            width: "30vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="banner-image-for-login"
        >
          <img
            style={{ width: "150px", height: "150px" ,marginRight:"30px"}}
            src="https://res.cloudinary.com/drqiw6wyl/image/upload/v1722853169/e1mki1ies2t0ttrypbra.jpg"
            alt="banner"
          />
          <div>
            <h1 className="VTS-Title">VTS</h1>
            {/* <h5>ENTERPRISES</h5> */}
          </div>
        </div>
        <img
            style={{ width: "600px", height: "600px",position:"absolute",top:"20vh",left:"5vw" }}
            src={`${process.env.PUBLIC_URL}/assets/images/image.png`}
            // src="https://app.lottiefiles.com/animation/a8b716d1-9562-4534-94af-892a47bdea24"
            alt="banner"
          />
        <div className="login-page-vl"></div>
        <div className="login-main">
          <div
            className="Payslip-SignUp
          "
          >
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
              <button type="submit">{isLoading ? (<><Spin indicator={<LoadingOutlined spin />} size="small" color="white" /> {" "}Logging In..</>):("Login")}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
