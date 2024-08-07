import React, { useState } from "react";
import Payslips from "./Payslips";
import Uploadfile from "./Uploadfile";
import Dashboard from "./Dashboard";
import Leave from "./Leave";
import LeaveForm from "./LeaveForm";
import Attendance from "./Attendance";
import AddEmployee from "./AddEmployee";
import { useLocation, useNavigate } from "react-router-dom";
import ViewEmp from "./ViewEmp";
import Cookies from "js-cookie";
const Hero = () => {
  const userdata = useLocation().state;
  const navigate = useNavigate();
  const [page, setPage] = useState("dashboard");
  const handleLogout = () => {
    Cookies.remove("employee");
    navigate("/");
  };
  return (
    <div className="heroSection">
      <div className="dashboard">
        <div className="userDetails">
          <img
            src={process.env.PUBLIC_URL + "assets/images/logo.png"}
            alt=""
            className="userProfile"
          />
          <div style={{ textAlign: "left" }} className="userData">
            <label>Name:</label>
            <div>{userdata.Name}</div>
          </div>
          <div style={{ textAlign: "left" }} className="userData">
            <label>Emp ID:</label>
            <div>{userdata.empId}</div>
          </div>
          <div className="userData">
            <label style={{ textAlign: "left" }}>Role :</label>
            <div>{userdata.role}</div>
          </div>
          {/* <div style={{ textAlign: "left" }} className="userData">
            <label>Email:</label>
            <div>{userdata.email}</div>
          </div>
          <div style={{ textAlign: "left" }} className="userData">
            <label>Phone No:</label>
            <div>{userdata.phone}</div>
          </div> */}
        </div>
        <div className="dashLinks">
          <div className="dashLink">
            <p onClick={() => setPage("dashboard")}>Dashboard</p>
          </div>
          {(userdata.role === "admin" || userdata.role === "hr") && (
            <div className="dashLink">
              <p onClick={() => setPage("addemployee")}>Employee</p>
              {(userdata.role === "admin" || userdata.role === "hr") && (
                <ul className="dashDropDownList">
                  <li onClick={() => setPage("addemployee")}>Add Employee</li>
                  <li onClick={() => setPage("viewemployee")}>View Details</li>
                </ul>
              )}
            </div>
          )}

          <div className="dashLink">
            <p onClick={() => setPage("attendance")}>Attendance</p>
          </div>
          <div className="dashLink">
            <p>Payroll</p>
            <ul className="dashDropDownList">
              <li onClick={() => setPage("payslips")}>Pay Slips</li>
              {(userdata.role === "admin" || userdata.role === "hr") && (
                <li onClick={() => setPage("generate")}>Genarate</li>
              )}
            </ul>
          </div>
          <div className="dashLink">
            <p>Leave</p>
            <ul className="dashDropDownList">
              <li onClick={() => setPage("leave")}>Details</li>
              <li onClick={() => setPage("applyleave")}>Apply for leave</li>
            </ul>
          </div>
          <div className="dashLink">
            <p onClick={handleLogout}>Logout</p>
          </div>
        </div>
      </div>
      {page === "addemployee" && <AddEmployee />}
      {page === "viewemployee" && <ViewEmp />}
      {page === "dashboard" && <Dashboard name={userdata.Name} />}
      {page === "attendance" && <Attendance />}
      {page === "payslips" && <Payslips empId={userdata.empId} />}
      {page === "generate" && <Uploadfile />}
      {page === "leave" && <Leave />}
      {page === "applyleave" && <LeaveForm />}
    </div>
  );
};

export default Hero;
