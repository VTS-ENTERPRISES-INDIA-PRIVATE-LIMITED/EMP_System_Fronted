import React, { useState, useEffect } from "react";
import axios from "axios";

const Leave = () => {
    const [leaveData, setLeaveData] = useState([]);
    const [filter, setFilter] = useState({
        reason: '',
        status: '',
        date: ''
    });
    const [showPopup, setShowPopup] = useState(false);
    const [selectedLeaveId, setSelectedLeaveId] = useState(null);
    const [remark, setRemark] = useState('');

    const fetchLeaveData = () => {
        axios.get(process.env.REACT_APP_BACKEND_URL+"/leave/show")
            .then(response => {
                const fetchedData = response.data.map(item => ({
                    leaveId: item.leaveId,
                    empId: item.empId,
                    name: item.Name,
                    role: item.role,
                    reason: item.reason,
                    leave_fdate: new Date(item.leave_fdate).toLocaleDateString('en-GB'),
                    leave_tdate: new Date(item.leave_tdate).toLocaleDateString('en-GB'),
                    remark: item.remark,
                    status: item.approved ? 'approved' : 'rejected'
                }));
                setLeaveData(fetchedData);
            })
            .catch(error => console.error("There was an error fetching the leave data:", error));
    };

    useEffect(fetchLeaveData);

    const uniqueReasons = Array.from(new Set(leaveData.map(item => item.reason)));
    const uniqueStatuses = Array.from(new Set(leaveData.map(item => item.status)));

    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    };

    const handleApprove = async (leaveId) => {
        await axios.post(process.env.REACT_APP_BACKEND_URL+"/leave/approve", { leaveId })
            .then(response => {
                console.log(response.data);
                fetchLeaveData();
            })
            .catch(error => console.error("There was an error approving the leave:", error));
    };

    const handleDecline = (leaveId) => {
        setSelectedLeaveId(leaveId);
        setShowPopup(true);
    };

    const handlePopupSave = async () => {
        await axios.post(process.env.REACT_APP_BACKEND_URL+"/leave/update", { leaveId: selectedLeaveId, remark :remark})
            .then(response => {
                console.log(response.data);
                console.log(remark);
                fetchLeaveData();  // Fetch the updated data
                setShowPopup(false);  // Close the popup
            })
            .catch(error => console.error("There was an error updating the leave:", error));
        setRemark('')
        setShowPopup(false);
    };


    const filterDate = filter.date ? parseDate(filter.date) : null;

    const filteredData = leaveData.filter((item) => {
        const leaveFDate = parseDate(item.leave_fdate);
        const leaveTDate = parseDate(item.leave_tdate);

        const isReasonMatch = !filter.reason || item.reason === filter.reason;
        const isStatusMatch = !filter.status || item.status === filter.status;
        const isDateInRange = !filterDate || (filterDate >= leaveFDate && filterDate <= leaveTDate);

        return isReasonMatch && isStatusMatch && isDateInRange;
    });

    return (
        <div className="leaveCont">
            <div className="leaveFilters">
                <select
                    name="reason"
                    value={filter.reason}
                    onChange={handleFilterChange}
                >
                    <option value="">All Reasons</option>
                    {uniqueReasons.map((reason, index) => (
                        <option key={index} value={reason}>{reason}</option>
                    ))}
                </select>

                <select
                    name="status"
                    value={filter.status}
                    onChange={handleFilterChange}
                >
                    <option value="">All Statuses</option>
                    {uniqueStatuses.map((status, index) => (
                        <option key={index} value={status}>{status}</option>
                    ))}
                </select>
                <input
                    type="date"
                    name="date"
                    value={filter.date}
                    onChange={handleFilterChange}
                />
            </div>
            <table className="leaveTable">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Reason</th>
                        <th>Leave From Date</th>
                        <th>Leave To Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.empId}</td>
                            <td>{row.name}</td>
                            <td>{row.role}</td>
                            <td>{row.reason}</td>
                            <td>{row.leave_fdate}</td>
                            <td>{row.leave_tdate}</td>
                            <td>
                                {row.status === 'approved' ? 
                                <div className="aprvStatus">
                                    <img src={process.env.PUBLIC_URL + 'assets/images/right.png'} alt="right"/> Approved
                                </div> : 
                                <>
                                {row.remark === null ?
                                    <>
                                        <button onClick={() => handleApprove(row.leaveId)} className="aprvBtn">Approve</button>
                                        <button onClick={() => handleDecline(row.leaveId)} className="dclBtn">Decline</button>
                                    </>
                                    :
                                    <div className="aprvStatus">
                                        <img src={process.env.PUBLIC_URL + 'assets/images/wrong.png'} alt="wrong"/> Declined
                                    </div>
                                }
                                </>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Remark Popup */}
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h5>Enter Remark</h5>
                        <textarea 
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                            rows="3"
                        />
                        <div className="popup-buttons">
                            <button className="cancelBtn" onClick={() => setShowPopup(false)}>Cancel</button>
                            <button className="saveBtn" onClick={handlePopupSave}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Leave;
