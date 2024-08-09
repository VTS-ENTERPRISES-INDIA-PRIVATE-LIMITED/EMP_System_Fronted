import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { Button, Modal } from "antd";
import AddEmployee from "./AddEmployee";
import { toast, ToastContainer } from "react-toastify";
import AddMultipleEmployee from "./EMployeeComponents/AddMultipleEmployee";
const ViewEmp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewData, setViewData] = useState({
    Name: "",
    email: "",
    phone: "",
    role: "",
    id: "",
  });
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const [file, setFile] = useState();
  const [uplaodText, setUploadText] = useState("Upload");
  const [dataList, setDataList] = useState();
  const [editName, setEditName] = useState();
  const [editemail, setEditemail] = useState();
  const [editphone, setEditphone] = useState();
  const [editrole, setEditrole] = useState();
  const [Message, setMessage] = useState();
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    role: "Employee",
    email: "",
    phoneNumber: "",
  });
  const [errMsg, setErrMsg] = useState({
    name: "",
    employeeId: "",
    email: "",
    phoneNumber: "",
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };
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
  const handleFileUpload = (event) => {
    if (file) {
      setUploadText("Uploading");
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const filteredData = jsonData.filter((row) => {
          return Object.values(row).some(
            (value) => value && value.toString().trim() !== ""
          );
        });

        console.log(filteredData);

        const url = `${process.env.REACT_APP_BACKEND_URL}/admin/addempdata`;
        console.log(url);
        axios
          .post(url, filteredData)
          .then((res) => {
            setUploadText("Uploaded");
            toast.success("Data Added Successfully");
          })
          .catch((err) => {
            setUploadText("Failed");
            toast.error("Failed to add Data");
          });
      };
      reader.readAsArrayBuffer(file);
    }
  };
  const validateField = (name, value) => {
    let error = "";

    if (name === "name") {
      if (!value) {
        error = "Employee Name required";
      } else if (!/[a-zA-Z]{6,}/.test(value)) {
        error = "Name requires at least 6 characters";
      }
    }

    if (name === "employeeId") {
      if (!value) {
        error = "Employee ID required";
      } else if (!/^VTS202[\d]{4}$/.test(value)) {
        error = "Invalid employee ID";
      }
    }

    if (name === "email") {
      if (!value) {
        error = "Employee email required";
      } else if (
        !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
          value
        )
      ) {
        error = "Enter a valid email address";
      }
    }

    if (name === "phoneNumber") {
      if (!value) {
        error = "Employee phone number required";
      } else if (!/^[0-9]{10}$/.test(value)) {
        error = "Please enter a valid phone number";
      }
    }

    setErrMsg((prevErrs) => ({
      ...prevErrs,
      [name]: error,
    }));

    return error === "";
  };
  const validateAllFields = () => {
    const isNameValid = validateField("name", formData.name);
    const isEmployeeIdValid = validateField("employeeId", formData.employeeId);
    const isEmailValid = validateField("email", formData.email);
    const isPhoneNumberValid = validateField(
      "phoneNumber",
      formData.phoneNumber
    );

    return (
      isNameValid && isEmployeeIdValid && isEmailValid && isPhoneNumberValid
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    if (validateAllFields()) {
      const data = {
        empId: formData.employeeId,
        name: formData.name,
        email: formData.email,
        phone: formData.phoneNumber,
        role: formData.role,
      };
      const url = `http://localhost:5000/admin/addEmp`;
      console.log(url);
      axios.post(url, [data]).then((res) => {
        toast.success("Data Added Successfully");
      });
    } else {
      toast.error("Something went wrong");
    }
  };
  const handleViewIndividual = (Id) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/admin/viewEmp/${Id}`;
    axios.post(url).then((res) =>
      setViewEmpData({
        empId: Id,
        Name: res.data[0][0].Name,
        email: res.data[0][0].email,
        phone: res.data[0][0].phone,
        role: res.data[0][0].role,
      })
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

  //single empl modal
  const [singleEmpModel, setSingleEmpModal] = useState(false);
  const [multipleEmpModel, setmultipleEmpModal] = useState(false);
  const showSingleEmpModal = () => {
    setSingleEmpModal(true);
  };
  const showMultipleEmpModal = () => {
    setmultipleEmpModal(true);
  };
  const handleCancelMultilpleEmpModal = () => {
    setmultipleEmpModal(false);
  };

  const handleCancelSingleEmpModal = () => {
    setSingleEmpModal(false);
  };
  const handleSingleEmployee = () => {
    setSingleEmpModal(true);
  };
  const handleMultipleEmployee = () => {};
  return (
    <div className="viewCont">
      <ToastContainer />
      <Modal
        title="Add Employee"
        open={singleEmpModel}
        onOk={handleSingleEmployee}
        onCancel={handleCancelSingleEmpModal}
      >
        <div>
          {/* <h4 style={{ marginTop: "30px" }}>Add Single Emp Data</h4> */}
          <form onSubmit={handleSubmit} className="excel-form-container">
            <div className="excel-form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            {errMsg.name && <span className="warningMsg">{errMsg.name}</span>}
            <div className="excel-form-group">
              <label htmlFor="employeeId">Employee ID:</label>
              <input
                type="text"
                id="employeeId"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
              />
            </div>
            {errMsg.employeeId && (
              <span className="warningMsg">{errMsg.employeeId}</span>
            )}
            <div className="excel-form-group">
              <label htmlFor="role">Role:</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="HR">HR</option>
                <option value="Employee">Employee</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="excel-form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {errMsg.email && <span className="warningMsg">{errMsg.email}</span>}
            <div className="excel-form-group">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            {errMsg.phoneNumber && (
              <span className="warningMsg">{errMsg.phoneNumber}</span>
            )}
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </Modal>
      <Modal
        title="Add Multiple Employee Data"
        open={multipleEmpModel}
        onOk={handleMultipleEmployee}
        onCancel={handleCancelMultilpleEmpModal}
      >
        <AddMultipleEmployee />
      </Modal>
      <div style={{ width: "75%", textAlign: "left" }} className="action-items">
        <button className="DelBtn" onClick={showSingleEmpModal}>
          Add Employee
        </button>
        <button className="DelBtn" onClick={showMultipleEmpModal}>
          Add Multiple Employees
        </button>
      </div>
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
          <p style={{ marginRight: "235px" }}>
            <b>Role:</b>
          </p>
          <div className="editEmpSelect">
            <div>
              {" "}
              <select
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
