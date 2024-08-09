import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { toast, ToastContainer } from "react-toastify";
const AddMultipleEmployee = () => {
   

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
 


  return (
    <div>
        <ToastContainer/>
      <div>
          <h6 style={{ marginTop: "70px" }}>Upload Employee Data</h6>
          <p>{`***Fields must follow this pattern [*name,*empId,...]`}</p>
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
    </div>
  )
}

export default AddMultipleEmployee
