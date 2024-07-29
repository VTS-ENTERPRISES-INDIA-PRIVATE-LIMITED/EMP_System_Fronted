import React, { useState } from "react";

const Leave = () => {

    const leaveData = [
        { applyDate: '02/05/2024', reason: 'Sick', leaveDate: '05/05/2024', status: 'approved' },
        { applyDate: '02/05/2024', reason: 'Sick', leaveDate: '05/05/2024', status: 'approved' },
        { applyDate: '02/05/2024', reason: 'Sick', leaveDate: '05/05/2024', status: 'rejected' }
    ];

    const uniqueReasons = Array.from(new Set(leaveData.map(item => item.reason)));
    const uniqueStatuses = Array.from(new Set(leaveData.map(item => item.status)));
    
    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
    };
    const [filter, setFilter] = useState({
        reason: '',
        status: '',
        date: ''
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    };

    // Parse the single date input
    const filterDate = filter.date ? parseDate(filter.date) : null;

    // Filter the data
    const filteredData = leaveData.filter((item) => {
        const applyDate = parseDate(item.applyDate);
        const leaveDate = parseDate(item.leaveDate);

        const isReasonMatch = !filter.reason || item.reason === filter.reason;
        const isStatusMatch = !filter.status || item.status === filter.status;
        const isDateInRange = !filterDate || (filterDate >= applyDate && filterDate <= leaveDate);

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
                    <th>Date of apply</th>
                    <th>Reason</th>
                    <th>Date of Leave</th>
                    <th>Status</th>
                </thead>
                <tbody>
                    {filteredData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.applyDate}</td>
                            <td>{row.reason}</td>
                            <td>{row.leaveDate}</td>
                            <td>
                                <img
                                    src={process.env.PUBLIC_URL + (row.status === 'approved' ? 'assets/images/right.png' : 'assets/images/wrong.png')}
                                    alt=""
                                />
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default Leave