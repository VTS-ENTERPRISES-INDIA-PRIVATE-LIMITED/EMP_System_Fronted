import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const LeaveForm = ({role}) => {
  const [leaveCount, setLeaveCount] = useState(0);
  const [formData, setFormData] = useState({
    empId: "",
    Name: "",
    role: "",
    reason: "",
    leave_fdate: "",
    leave_tdate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    const { leave_fdate, leave_tdate } = formData;
    if (leave_fdate && leave_tdate) {
      const fromDate = new Date(leave_fdate);
      const toDate = new Date(leave_tdate);
      const timeDiff = toDate - fromDate;
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1; 
      setLeaveCount(daysDiff);
    } else {
      setLeaveCount(0);
    }
  }, [formData.leave_fdate, formData.leave_tdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/leave/apply",
        {
          empId: formData.empId,
          Name: formData.Name,
          role: role,
          reason: formData.reason,
          leave_fdate: formData.leave_fdate,
          leave_tdate: formData.leave_tdate,
        }
      );
      toast.success(response.data,{position:"top-center"});
    } catch (error) {
      console.error("There was an error applying for leave!", error);
      toast.error("There was an error applying for leave.",{position:"top-center"});
    }
  };

  return (
    <div className="leaveCont">
      <ToastContainer/>
      <form className="leaveForm" onSubmit={handleSubmit}>
        <span className="formHeader">
          <b>Leave Application</b>
        </span>
        <div className="flex">
          <div className="formHolder">
            <div className="formInp">
              <label htmlFor="empId">ID</label>
              <input
                type="text"
                name="empId"
                id="empId"
                value={formData.empId}
                onChange={handleChange}
              />
            </div>
            {/* <div className="formInp">
              <label htmlFor="reason">Reason</label>
              <input
                type="text"
                name="reason"
                id="reason"
                value={formData.reason}
                onChange={handleChange}
              />
            </div> */}

            <div className="formInp">
              <label htmlFor="leave_fdate">From</label>
              <input
                type="date"
                name="leave_fdate"
                id="leave_fdate"
                value={formData.leave_fdate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="formHolder">
            <div className="formInp">
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                name="Name"
                id="Name"
                value={formData.Name}
                onChange={handleChange}
              />
            </div>
            {/* <div className="formInp">
              <label htmlFor="reason">Reason</label>
              <input
                type="text"
                name="reason"
                id="reason"
                value={formData.reason}
                onChange={handleChange}
              />
            </div> */}
            <div className="formInp">
              <label htmlFor="leave_tdate">To</label>
              <input
                type="date"
                name="leave_tdate"
                id="leave_tdate"
                value={formData.leave_tdate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div>
          <div>
            <p>no.of leaves taken :{leaveCount} </p>
          </div>
          <div>
            <label htmlFor="reason">Reason</label>
            <textarea
              type="text"
              name="reason"
              id="reason"
              rows="3"
              columns="50"
              value={formData.reason}
              onChange={handleChange}
              style={{
                resize: "none",
                margin: "5px",
                width: "100%",
                // padding: "40px",
                borderRadius: "5px",
                marginBottom: "20px",
                border: "solid 1px #000",
                outline: "none",
              }}
            />
          </div>
        </div>
        <div className="formBtnCont">
          <button type="submit" className="formBtn formSubBtn">
            Submit
          </button>
          <button
            type="button"
            className="formBtn formCancelBtn"
            onClick={() =>
              setFormData({
                empId: "",
                Name: "",
                role: "",
                reason: "",
                leave_fdate: "",
                leave_tdate: "",
              })
            }
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveForm;
