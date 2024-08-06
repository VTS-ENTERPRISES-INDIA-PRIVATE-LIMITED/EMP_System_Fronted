import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [otpReceived, setOtpReceived] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [gotOtp, setGotOtp] = useState(false);
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateOtp = (otp) => {
    return otp.length === 6 && /^\d+$/.test(otp);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleGetOtp = () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      return;
    }
    setEmailError("");
    const url = `http://localhost:5000/emp/sendotp`;
    axios
      .post(url, { email })
      .then((res) => {
        alert(res.data.otp);
        setOtpReceived(res.data.otp);
        setOtpSent(true);
      })
      .catch((err) => toast.error("Error Sending OTP"));

    // Logic to send OTP goes here
  };

  const handleVerifyOtp = () => {
    alert(otp)
    if (!validateOtp(otp)) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }
    if (otp === otpReceived.toString()) {
      setOtpError("");
      
      setOtpVerified(true);
    } else {
      setOtpError("Invalid OTP");
    }
  };

  const handleResetPassword = () => {
    if (!validatePassword(newPassword)) {
      // alert("Password must be at least 8 characters long.")
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    if (newPassword === confirmPassword && otpVerified) {
      setPasswordError("");
      const url = `${process.env.REACT_APP_BACKEND_URL}/emp/resetpassword`;
      axios
        .post(url, { email: email, password: newPassword })
        .then((res) => {
          toast.success("Reset Password Successful", {
            position: "top-center",
          });
          navigate("/");
        })
        .catch((err) =>
          toast.error("Failed to reset Password", { position: "top-center" })
        );
    }
  };

  return (
    <div className="Payslip-SignUp">
      <h2>Reset Password</h2>
      <div className="credentials">
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        {!otpSent && <button onClick={handleGetOtp}>Get OTP</button>}

        {otpSent && (<>
          
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="otpverify">
              {!otpVerified && <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />}
              

              {otpError && <p style={{ color: "red" }}>{otpError}</p>}
              {!otpVerified && <button onClick={handleVerifyOtp}>Verify</button>}
            </div>
            {otpVerified && (
              <>
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {passwordError && (
                  <p style={{ color: "red", textAlign: "center" }}>
                    {passwordError}
                  </p>
                )}
                <button onClick={handleResetPassword}>Reset Password</button>
              </>
            )}
          </div>
        </>)}
      </div>
    </div>
  );
};

export default SignUp;
