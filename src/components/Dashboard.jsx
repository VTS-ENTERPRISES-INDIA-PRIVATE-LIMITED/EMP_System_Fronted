import React from "react";
import { Table } from "antd";
const dataSource = [
  {
    key: "1",
    name: "Invoice Generation",
    start: "5/08/24",
    end: "10/08/24",
    description: "Make Sure to complete this project before 10/8/24.",
  },
 
];

const columns = [
  {
    title: "Title",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Start Date",
    dataIndex: "start",
    key: "start",
  },
  {
    title: "End Date",
    dataIndex: "end",
    key: "end",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
];

const Dashboard = ({ name }) => {
  return (
    <div className="dashBoardPage">
      <div className="loginCard">
        <div className="login-user">
          <b className="wish">
            <strong>Good to see you {name}...! 👋</strong>
          </b>
          <p>you came 15mins earlier today.</p>
        </div>
        <div className="logtimescard">
          <div className="loginCont">
            <img
              src={process.env.PUBLIC_URL + "assets/images/login.png"}
              alt=""
            />
            <div className="loginTime">
              <b>Login</b>
              <p>{localStorage.getItem('lastlogin')}</p>
            </div>
          </div>
          <div className="loginCont">
            <img
              src={process.env.PUBLIC_URL + "assets/images/logout.png"}
              alt=""
            />
            <div className="loginTime">
              <b>Logout</b>
              <p>{localStorage.getItem('lastlogout') ? localStorage.getItem('lastlogout'):"--"}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="loginCard leavescard">
        <div>
          <b>Total leave</b>

          <p style={{ color: "blue", fontSize: "25px",fontWeight:"500" }}>34 </p>
          <div className="leave-card">
            <div style={{ display: "flex", marginRight: "9px" }}>
              <p style={{ marginRight: "5px", color: "grey" }}> Paid</p>
              <p style={{ color: "blue" }}>10</p>
            </div>
            <div style={{ display: "flex" }}>
              <p style={{ marginRight: "5px", color: "grey" }}>Unpaid</p>
              <p style={{ color: "red" }}>4</p>
            </div>
          </div>
        </div>
        <div>
          <b>Total leave taken</b>
          <p style={{ color: "blue", fontSize: "25px",fontWeight:"500" }}>20</p>
          <div className="leave-card">
            <div style={{ display: "flex", marginRight: "9px" }}>
              <p style={{ marginRight: "5px", color: "grey" }}> Paid</p>
              <p style={{ color: "blue" }}>10</p>
            </div>
            <div style={{ display: "flex" }}>
              <p style={{ marginRight: "5px", color: "grey" }}>Unpaid</p>
              <p style={{ color: "red" }}>4</p>
            </div>
          </div>
        </div>
        <div>
          <b>Total leave Available</b>
          <p style={{ color: "blue", fontSize: "25px",fontWeight:"500" }}>87 </p>
          <div className="leave-card">
            <div style={{ display: "flex", marginRight: "9px" }}>
              <p style={{ marginRight: "5px", color: "grey" }}> Paid</p>
              <p style={{ color: "blue" }}>10</p>
            </div>
            <div style={{ display: "flex" }}>
              <p style={{ marginRight: "5px", color: "grey" }}>Unpaid</p>
              <p style={{ color: "red" }}>4</p>
            </div>
          </div>
        </div>
      </div>

      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Dashboard;