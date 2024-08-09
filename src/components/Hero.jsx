// import React, { useState } from "react";
// import Payslips from "./Payslips";
// import Uploadfile from "./Uploadfile";
// import Dashboard from "./Dashboard";
// import Leave from "./Leave";
// import LeaveForm from "./LeaveForm";
// import Attendance from "./Attendance";
// import AddEmployee from "./AddEmployee";
// import { useLocation, useNavigate } from "react-router-dom";
// import ViewEmp from "./ViewEmp";
// import Cookies from "js-cookie";

// import { GoHome } from "react-icons/go";
// import { IoIosPeople } from "react-icons/io";
// import { BsCalendar2Date } from "react-icons/bs";
// import { MdOutlinePayments } from "react-icons/md";
// import { FaRegCalendarTimes } from "react-icons/fa";
// import { TbLogout } from "react-icons/tb";

// const Hero = () => {
//   const userdata = useLocation().state;
//   const navigate = useNavigate();
//   const [page, setPage] = useState("dashboard");
//   const handleLogout = () => {
//     localStorage.setItem("lastlogout", getCurrentTime());
//     Cookies.remove("employee");
//     navigate("/");
//   };
//   const getCurrentTime = () => {
//     const date = new Date();
//     let hours = date.getHours();
//     const minutes = date.getMinutes();
//     const ampm = hours >= 12 ? "PM" : "AM";

//     hours = hours % 12;
//     hours = hours ? hours : 12;
//     const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;

//     return `${hours}:${minutesFormatted} ${ampm}`;
//   };

//   return (
//     <div className="heroSection">
//       <div className="dashboard">
//         {/* <div className="userDetails">
//           <img
//             src={process.env.PUBLIC_URL + "assets/images/logo.png"}
//             alt=""
//             className="userProfile"
//           />
//           <div style={{ textAlign: "left" }} className="userData">
//             <label>Name:</label>
//             <div>{userdata.Name}</div>
//           </div>
//           <div style={{ textAlign: "left" }} className="userData">
//             <label>Emp ID:</label>
//             <div>{userdata.empId}</div>
//           </div>
//           <div className="userData">
//             <label style={{ textAlign: "left" }}>Role :</label>
//             <div>{userdata.role}</div>
//           </div>
//           <div style={{ textAlign: "left" }} className="userData">
//             <label>Email:</label>
//             <div>{userdata.email}</div>
//           </div>
//           <div style={{ textAlign: "left" }} className="userData">
//             <label>Phone No:</label>
//             <div>{userdata.phone}</div>
//           </div>
//         </div> */}

//         <div className="dashLinks">
//           <div
//             style={{ display: "flex", alignItems: "center" }}
//             className="dashLink"
//           >
//             <p onClick={() => setPage("dashboard")}>
//               <GoHome style={{ fontSize: "20px", marginRight: "9px" }} />{" "}
//               <span
//                 style={{ fontSize: "16px", position: "relative", top: "3px" }}
//               >
//                 Dashboard
//               </span>
//             </p>
//           </div>
//           {(userdata.role === "admin" || userdata.role === "hr") && (
//             <div className="dashLink">
//               <p onClick={() => setPage("addemployee")}>
//                 <IoIosPeople style={{ fontSize: "20px", marginRight: "9px" }} />{" "}
//                 <span
//                   style={{ fontSize: "16px", position: "relative", top: "3px" }}
//                 >
//                   Employee
//                 </span>{" "}
//               </p>
//               {(userdata.role === "admin" || userdata.role === "hr") && (
//                 <ul className="dashDropDownList">
//                   <li onClick={() => setPage("addemployee")}>Add Employee</li>
//                   <li onClick={() => setPage("viewemployee")}>View Details</li>
//                 </ul>
//               )}
//             </div>
//           )}

//           <div className="dashLink">
//             <p onClick={() => setPage("attendance")}>
//               <BsCalendar2Date
//                 style={{ fontSize: "17px", marginRight: "9px" }}
//               />{" "}
//               <span
//                 style={{ fontSize: "16px", position: "relative", top: "3px" }}
//               >
//                 {" "}
//                 Attendance
//               </span>{" "}
//             </p>
//           </div>
//           <div className="dashLink">
//             <p>
//               <MdOutlinePayments
//                 style={{ fontSize: "22px", marginRight: "9px" }}
//               />{" "}
//               <span
//                 style={{ fontSize: "16px", position: "relative", top: "3px" }}
//               >
//                 Payroll
//               </span>
//             </p>
//             <ul className="dashDropDownList">
//               <li onClick={() => setPage("payslips")}>Pay Slips</li>
//               {(userdata.role === "admin" || userdata.role === "hr") && (
//                 <li onClick={() => setPage("generate")}>Generate</li>
//               )}
//             </ul>
//           </div>

//           <div className="dashLink">
//             <p>
//               <FaRegCalendarTimes
//                 style={{ fontSize: "20px", marginRight: "9px" }}
//               />{" "}
//               <span
//                 style={{ fontSize: "16px", position: "relative", top: "3px" }}
//               >
//                 Leave
//               </span>{" "}
//             </p>
//             <ul className="dashDropDownList">
//               {(userdata.role === "admin" ||
//                 userdata.role === "hr" ||
//                 userdata.role === "team-lead") && (
//                 <>
//                   <li onClick={() => setPage("leave")}>Approve Leaves</li>
//                 </>
//               )}
//               <li onClick={() => setPage("applyleave")}>Apply for leave</li>
//             </ul>
//           </div>

//           <div className="dashLink">
//             <p onClick={handleLogout}>
//               <TbLogout style={{ fontSize: "20px", marginRight: "9px" }} />{" "}
//               <span
//                 style={{ fontSize: "16px", position: "relative", top: "2px" }}
//               >
//                 Logout
//               </span>{" "}
//             </p>
//           </div>
//         </div>
//       </div>
//       {page === "addemployee" && <AddEmployee />}
//       {page === "viewemployee" && <ViewEmp />}
//       {page === "dashboard" && <Dashboard name={userdata.Name} />}
//       {page === "attendance" && <Attendance />}
//       {page === "payslips" && <Payslips empId={userdata.empId} />}
//       {page === "generate" && <Uploadfile />}
//       {page === "leave" && <Leave />}
//       {page === "applyleave" && <LeaveForm userdata={userdata} />}
//     </div>
//   );
// };

// export default Hero;

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

import { GoHome } from "react-icons/go";
import { IoIosPeople } from "react-icons/io";
import { BsCalendar2Date } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaRegCalendarTimes } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";

const Hero = () => {
  const userdata = useLocation().state;
  const navigate = useNavigate();
  const [page, setPage] = useState("dashboard");

  const handleLogout = () => {
    localStorage.setItem("lastlogout", getCurrentTime());
    Cookies.remove("employee");
    navigate("/");
  };

  const getCurrentTime = () => {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutesFormatted} ${ampm}`;
  };

  return (
    <div className="heroSection">
      <div className="dashboard">
        <div className="dashLinks">
          <div className="dashlink-heading">
            General <hr />
          </div>
          <div
            className={`dashLink ${page === "dashboard" ? "active" : ""}`}
            onClick={() => setPage("dashboard")}
          >
            <GoHome style={{ fontSize: "20px", marginRight: "9px" }} />
            <span>Dashboard</span>
          </div>
          {(userdata.role === "admin" || userdata.role === "hr") && (
            <div
              className={`dashLink ${page === "viewemployee" ? "active" : ""}`}
              onClick={() => setPage("viewemployee")}
            >
              <IoIosPeople style={{ fontSize: "20px", marginRight: "9px" }} />
              <span>Manage Employees</span>
            </div>
          )}
          <div
            className={`dashLink ${page === "attendance" ? "active" : ""}`}
            onClick={() => setPage("attendance")}
          >
            <BsCalendar2Date style={{ fontSize: "17px", marginRight: "9px" }} />
            <span>Attendance</span>
          </div>
          <div
            className={`dashLink ${page === "payslips" ? "active" : ""}`}
            onClick={() => setPage("payslips")}
          >
            <MdOutlinePayments
              style={{ fontSize: "22px", marginRight: "9px" }}
            />
            <span>Payroll</span>
            {/* <ul className="dashDropDownList">
              <li onClick={() => setPage("payslips")}>Pay Slips</li>
              {(userdata.role === "admin" || userdata.role === "hr") && (
                <li onClick={() => setPage("generate")}>Generate</li>
              )}
            </ul> */}
          </div>
          <div
            className={`dashLink ${page === "leave" ? "active" : ""}`}
            onClick={() => setPage("leave")}
          >
            <FaRegCalendarTimes
              style={{ fontSize: "20px", marginRight: "9px" }}
            />
            <span>Leave</span>
            {/* <ul className="dashDropDownList">
              {(userdata.role === "admin" ||
                userdata.role === "hr" ||
                userdata.role === "team-lead") && (
                <>
                  <li onClick={() => setPage("leave")}>Approve Leaves</li>
                </>
              )}
              <li onClick={() => setPage("applyleave")}>Apply for leave</li>
            </ul> */}
          </div>
          <div className="dashLink" onClick={handleLogout}>
            <TbLogout style={{ fontSize: "20px", marginRight: "9px" }} />
            <span>Logout</span>
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
      {page === "applyleave" && <LeaveForm userdata={userdata} />}
    </div>
  );
};

export default Hero;
