import React from "react";

const LeaveForm = () => {
    return (
        <div className="leaveCont">
            <div className="leaveForm">
                <span className="formHeader"><b>Leave Application</b></span>
                <div className="flex">
                    <div className="formHolder">
                        <div className="formInp">
                            <label htmlFor="leaveId">ID</label>
                            <input type="text" name="leaveId" id="leaveId" />
                        </div>
                        <div className="formInp">
                            <label htmlFor="leaveName">Name</label>
                            <input type="text" name="leaveName" id="leaveName" />
                        </div>
                        <div className="formInp">
                            <label htmlFor="leaveFromDate">From</label>
                            <input type="date" name="leaveFromDate" id="leaveFromDate" />
                        </div>
                    </div>
                    <div className="formHolder">
                    <div className="formInp">
                        <label htmlFor="leaveRole">Role</label>
                        <input type="text" name="leaveRole" id="leaveRole" />
                    </div>
                    <div className="formInp">
                        <label htmlFor="leaveReason">Reason</label>
                        <input type="text" name="leaveReason" id="leaveReason" />
                    </div>
                    <div className="formInp">
                        <label htmlFor="leaveToDate">To</label>
                        <input type="date" name="leaveToDate" id="leaveToDate" />
                    </div>
                    </div>
                </div>
                <div className="formDesp">
                    <label htmlFor="leaveDesp">Description</label>
                    <input type="text" name="leaveDesp" id="leaveDesp" />
                </div>
                <div className="formBtnCont">
                    <button className="formBtn formSubBtn">Submit</button>
                    <button className="formBtn formCancelBtn">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default LeaveForm