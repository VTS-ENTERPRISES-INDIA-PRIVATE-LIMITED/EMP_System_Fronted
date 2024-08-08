import React, { useState } from "react";
import axios from 'axios';

const LeaveForm = () => {
    const [formData, setFormData] = useState({
        empId: '',
        Name: '',
        role: '',
        reason: '',
        leave_fdate: '',
        leave_tdate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {            
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'/leave/apply', {
                empId: formData.empId,
                Name: formData.Name,
                role: formData.role,
                reason: formData.reason,
                leave_fdate: formData.leave_fdate,
                leave_tdate: formData.leave_tdate
            });
            console.log(formData);
            
            alert(response.data);
        } catch (error) {
            console.error('There was an error applying for leave!', error);
            alert('There was an error applying for leave.');
        }
    };

    return (
        <div className="leaveCont">
            <form className="leaveForm" onSubmit={handleSubmit}>
                <span className="formHeader"><b>Leave Application</b></span>
                <div className="flex">
                    <div className="formHolder">
                        <div className="formInp">
                            <label htmlFor="empId">ID</label>
                            <input type="text" name="empId" id="empId" value={formData.empId} onChange={handleChange} />
                        </div>
                        <div className="formInp">
                            <label htmlFor="Name">Name</label>
                            <input type="text" name="Name" id="Name" value={formData.Name} onChange={handleChange} />
                        </div>
                        <div className="formInp">
                            <label htmlFor="leave_fdate">From</label>
                            <input type="date" name="leave_fdate" id="leave_fdate" value={formData.leave_fdate} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="formHolder">
                        <div className="formInp">
                            <label htmlFor="role">Role</label>
                            <input type="text" name="role" id="role" value={formData.role} onChange={handleChange} />
                        </div>
                        <div className="formInp">
                            <label htmlFor="reason">Reason</label>
                            <input type="text" name="reason" id="reason" value={formData.reason} onChange={handleChange} />
                        </div>
                        <div className="formInp">
                            <label htmlFor="leave_tdate">To</label>
                            <input type="date" name="leave_tdate" id="leave_tdate" value={formData.leave_tdate} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div className="formBtnCont">
                    <button type="submit" className="formBtn formSubBtn">Submit</button>
                    <button type="button" className="formBtn formCancelBtn" onClick={() => setFormData({
                        empId: '',
                        Name: '',
                        role: '',
                        reason: '',
                        leave_fdate: '',
                        leave_tdate: ''
                    })}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default LeaveForm;
