import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "antd";
const ViewEmp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewData, setViewData] = useState({
    Name: "",
    email: "",
    phone: "",
    role: "",
    id: "",
  });
  const [dataList, setDataList] = useState();
  const [editName, setEditName] = useState();
  const [editemail, setEditemail] = useState();
  const [editphone, setEditphone] = useState();
  const [editrole, setEditrole] = useState();
  const [Message, setMessage] = useState();
  const [validMessage, setvalidMessage] = useState({
    Name: "",
    email: "",
    phone: "",
    role: "",
    id: "",
  });
  const [validity, setValidity] = useState(true);
  const [viewEmpData, setViewEmpData] = useState({
    Name: "",
    email: "",
    phone: "",
    role: "",
  });
  const [popUp, setPopUp] = useState(false);

  // const [editData, setEditData] = useState({id:viewData.id ,Name: viewData.Name, email : viewData.email, phone : viewData.phone, role: viewData.role})
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setViewData({ Name: "" });
  };
  const handleCancel = () => {
    setViewData({ Name: "" });
    setIsModalOpen(false);
  };
  const handleView = () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/admin/viewEmp`;
    axios.post(url).then((res) => {
      setDataList(res.data);
    });
  };

  const handleViewIndividual = (Id) => {
    // const url = `http://localhost:5000/admin/viewEmp/${Id}`;
    const url = `${process.env.REACT_APP_BACKEND_URL}/admin/viewEmp/${Id}`;
    axios.post(url).then((res) =>
      {console.log(res.data)
        setViewEmpData({
        empId: Id,
        Name: res.data[0][0].Name,
        email: res.data[0][0].email,
        phone: res.data[0][0].phone,
        role: res.data[0][0].role,
      })}
    );
    setPopUp(true);
  };

  const handleEdit = async (Id) => {
    // const url = `http://localhost:5000/admin/updateEmp/${Id}`
    const url = `${process.env.REACT_APP_BACKEND_URL}/admin/updateEmp/${Id}`;
    await axios
      .post(url, { editName, editemail, editphone, editrole })
      .then((res) => {
        setMessage(res.data.message);
      });
  };
  

  const handleShowEditForm = (Id) => {
    showModal();
    const url = `${process.env.REACT_APP_BACKEND_URL}/admin/viewEmp/${Id}`;
    axios.post(url).then((res) => {
      setViewData({
        id: Id,
        Name: res.data[0][0].Name,
        email: res.data[0][0].email,
        phone: res.data[0][0].phone,
        role: res.data[0][0].role,
      });
      setEditName(res.data[0][0].Name);
      setEditemail(res.data[0][0].email);
      setEditphone(res.data[0][0].phone);
      setEditrole(res.data[0][0].role);
    });
  };

  const handleDelete = (Id) => {
    // const url = `http://localhost:5000/admin/deleteEmp/${Id}`
    const url = `${process.env.REACT_APP_BACKEND_URL}/admin/deleteEmp/${Id}`;

    axios.post(url).then(() => console.log("deleted successfully"));
  };

  const validName = /[\D]{6,}/;
  const emailPattern =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i;
  const phonePattern = /[0-9]{10}/;
  const validateName = (Name) => {
    if (!validName.test(Name)) {
      setvalidMessage({ ...validMessage, Name: "Enter a valid username" });
      setValidity(false);
    } else {
      setvalidMessage({ ...validMessage, Name: "" });
      setValidity(true);
    }
  };
  const validateEmail = (email) => {
    if (!emailPattern.test(email)) {
      setvalidMessage({ ...validMessage, email: "Enter a valid email" });
      setValidity(false);
    } else {
      console.log("");
      setvalidMessage({ ...validMessage, email: "" });
      setValidity(true);
    }
  };
  const validatePhone = (phone) => {
    if (!phonePattern.test(phone)) {
      setvalidMessage({ ...validMessage, phone: "Enter a valid phone number" });
      setValidity(false);
    } else {
      console.log("");
      setvalidMessage({ ...validMessage, phone: "" });
      setValidity(true);
    }
  };

  useEffect(handleView, []);
  useEffect(handleView, [dataList]);

  return (
    <div className="viewCont">
      <div className="viewContDiv">
        <table className="viewContTable">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Employee Role</th>
              <th>View</th>
              {/* <th>Edit</th> */}
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {dataList?.map((empDet, index) => {
              return (
                <tr key={empDet.empId}>
                  <td>{index + 1}</td>
                  <td>{empDet.empId}</td>
                  <td>{empDet.Name}</td>
                  <td>{empDet.role}</td>
                  <td>
                    <button
                      onClick={() => handleViewIndividual(empDet.empId)}
                      className="editBtn"
                    >
                      View
                    </button>
                  </td>
                  {/* <td>
                    <button
                      onClick={() => handleShowEditForm(empDet.empId)}
                      className="editBtn"
                    >
                      Edit
                    </button>
                  </td> */}
                  <td>
                    <button
                      className="DelBtn"
                      onClick={() => handleDelete(empDet.empId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal
        // title="Basic Modal"

        open={isModalOpen}
        className="subButton"
        onCancel={handleCancel}
      >
        <form action="" className="editEmpform">
          <div className="editEmpForm-input">
            <p>
              <b>Name:</b>
            </p>
            <input
              type="text"
              className="editEmpInp"
              defaultValue={viewData.Name}
              style={{ marginTop: "-5px" }}
              onChange={(e) => {
                validateName(e.target.value);
                setEditName(e.target.value);
              }}
            />
            {validMessage.Name && (
              <span className="invalidMsg">{validMessage.Name}</span>
            )}
          </div>
          <div className="editEmpForm-input">
            <p>
              <b>Email:</b>
            </p>

            <input
              type="text"
              className="editEmpInp"
              defaultValue={viewData.email}
              style={{ marginTop: "-5px" }}
              onChange={(e) => {
                validateEmail(e.target.value);
                setEditemail(e.target.value);
              }}
            />
            {validMessage.email && (
              <span className="invalidMsg">{validMessage.email}</span>
            )}
          </div>
          <div className="editEmpForm-input">
            <p>
              <b>Phone no:</b>
            </p>

            <input
              type="text"
              className="editEmpInp"
              defaultValue={viewData.phone}
              style={{ marginTop: "-5px" }}
              onChange={(e) => {
                validatePhone(e.target.value);
                setEditphone(e.target.value);
              }}
            />
            {validMessage.phone && (
              <span className="invalidMsg">{validMessage.phone}</span>
            )}
          </div>
              <p style={{marginRight:"235px"}}>
                <b>Role:</b>
              </p>
            <div className="editEmpSelect">
              
             <div> <select
                value={editrole}
                onChange={(e) => {
                  setEditrole(e.target.value);
                }}
              >
                <option value="Employee">Employee</option>
                <option value="admin">admin</option>
                <option value="hr">hr</option>
              </select>
              </div>
            </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
              marginLeft: "10px",
            }}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                handleCancel();
                handleEdit(viewData.id);
                handleOk();
                setViewData({ Name: "" });
              }}
              style={{
                // display: "flex",
                border: "none",
                // alignItems: "center",
                borderRadius: "7px",
                backgroundColor: "#07076e",
                color: "#fff",
                marginTop: "20px",
                // justifyContent: "flex-end",
                padding: "5px 20px",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
      {popUp && (
        <div className="viewPop">
          <div className="viewEmpData">
            <buttton className="closeView" onClick={() => setPopUp(false)}>
              x
            </buttton>
            <div className="empData">
              <label htmlFor="">Employee Id</label>
              <div className="empDataValue">{viewEmpData.empId}</div>
            </div>
            <div className="empData">
              <label htmlFor="">Employee Name</label>
              <div className="empDataValue">{viewEmpData.Name}</div>
            </div>
            <div className="empData">
              <label htmlFor="">Role</label>
              <div className="empDataValue">{viewEmpData.role}</div>
            </div>
            <div className="empData">
              <label htmlFor="">Email</label>
              <div className="empDataValue">{viewEmpData.email}</div>
            </div>
            <div className="empData">
              <label htmlFor="">Phone</label>
              <div className="empDataValue">{viewEmpData.phone}</div>
            </div>
            <div className="empData">
              <label htmlFor="">No. of Leaves</label>
              <div className="empDataValue">10</div>
            </div>
            <div className="empData">
              <button
                className="editBtn"
                onClick={() => {
                  handleShowEditForm(viewEmpData.empId);
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewEmp;
