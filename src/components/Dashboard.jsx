import React from "react";
import { Space, Table, Tag } from "antd";
const columns = [
  {
    title: "Title",
    dataIndex: "name",
    key: "title",
  },
  {
    title: "Start Date",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "End Date",
    dataIndex: "address",
    key: "address",
  },

  {
    title: "Description",
    key: "action",
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "5",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
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
              <p>8:45 AM</p>
            </div>
          </div>
          <div className="loginCont">
            <img
              src={process.env.PUBLIC_URL + "assets/images/logout.png"}
              alt=""
            />
            <div className="loginTime">
              <b>Logout</b>
              <p>5:00 PM</p>
            </div>
          </div>
        </div>
      </div>
      <div className="loginCard leavescard">
        <div>
          <b>Total leave</b>

          <p style={{ color: "blue", fontSize: "25px" }}>34 </p>
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
          <p style={{ color: "blue", fontSize: "25px" }}>20</p>
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
          <p style={{ color: "blue", fontSize: "25px" }}>87 </p>
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
      {/* <table className="anouncements">
        <thead>
          <td>
            <b>Announcements</b>
          </td>
        </thead>
        <tbody>
          <tr>
            <td>Title</td>
            <td>Start Date</td>
            <td>End Date</td>
            <td>Description</td>
          </tr>
          <tr>
            <td>Title</td>
            <td>Start Date</td>
            <td>End Date</td>
            <td>Description</td>
          </tr>
          <tr>
            <td>Title</td>
            <td>Start Date</td>
            <td>End Date</td>
            <td>Description</td>
          </tr>
          <tr>
            <td>Title</td>
            <td>Start Date</td>
            <td>End Date</td>
            <td>Description</td>
          </tr>
          <tr>
            <td>Title</td>
            <td>Start Date</td>
            <td>End Date</td>
            <td>Description</td>
          </tr>
        </tbody>
      </table> */}
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Dashboard;
