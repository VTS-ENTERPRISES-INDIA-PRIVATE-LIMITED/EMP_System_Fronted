import React from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const userdata = useLocation().state;
  return (
    <div className="navBar">
      <div className="vts-logo">
        <img
          src={process.env.PUBLIC_URL + "assets/images/logo.png"}
          alt=""
          className="logo"
        />{" "}
        <span  style={{fontSize:"20px",fontWeight:"500",color:"white",marginTop:"3px",letterSpacing:"3px"}}>VTS </span>
      </div>
      <div className="vts-emp-data">
        <div style={{fontSize:"18px",marginRight:"9px",color:"#ced4da",fontWeight:"600",marginTop:"0.6em"}}> <span  style={{fontSize:"15px",fontWeight:"400"}}>Employee ID :</span> {userdata.empId} </div>
        <img
          src={process.env.PUBLIC_URL + "assets/images/profile.png"}
          alt=""
          className="logo"
        />
      </div>
    </div>
  );
};

export default Navbar;
