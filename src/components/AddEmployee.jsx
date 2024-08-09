import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";

const AddEmployee = () => {
  const [file, setFile] = useState();
  const [uplaodText, setUploadText] = useState("Upload");
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
    phoneNumber: ""
  });

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
      } else if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)) {
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
    const isPhoneNumberValid = validateField("phoneNumber", formData.phoneNumber);

    return isNameValid && isEmployeeIdValid && isEmailValid && isPhoneNumberValid;
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
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
        console.log(url)
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
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
      const url = `${process.env.REACT_APP_BACKEND_URL}/admin/addempdata`;
      console.log(url)
      axios.post(url, [data]).then((res) => {
        toast.success("Data Added Successfully");
      });
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="excel-reader-container">
        <div>
          <h4 style={{ marginTop: "70px" }}>Add Multiple Emp Data</h4>
          <div
            className="excel-multiple-data"
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "auto",
              alignItems: "center",
            }}
          >
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="excel-reader-file-input"
            />
            <button className="excel-upload-btn" onClick={handleFileUpload}>
              {uplaodText}
            </button>
          </div>
        </div>

        <div>
          <h4 style={{ marginTop: "30px" }}>Add Single Emp Data</h4>
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
            {errMsg.name && <span className='warningMsg'>{errMsg.name}</span>}
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
            {errMsg.employeeId && <span className='warningMsg'>{errMsg.employeeId}</span>}    
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
            {errMsg.email && <span className='warningMsg'>{errMsg.email}</span>}
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
            {errMsg.phoneNumber && <span className='warningMsg'>{errMsg.phoneNumber}</span>}
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
