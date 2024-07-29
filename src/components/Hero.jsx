import React, { useState } from 'react';
import Payslips from './Payslips';
import Uploadfile from './Uploadfile';
import Dashboard from './Dashboard';
import Leave from './Leave';
import LeaveForm from './LeaveForm';
import Attendance from './Attendance';

const Hero = () => {

    const [page, setPage] = useState('dashboard');
  return (
    <div className='heroSection'>
        <div className="dashboard">
            <div className="userDetails">
                <img src={process.env.PUBLIC_URL + 'assets/images/logo.png'} alt="" className="userProfile" />
                <div className="userData">
                    <label>Name:</label>
                    <div>Durga</div>
                </div>
                <div className="userData">
                    <label>Employee ID:</label>
                    <div>VTS2025051</div>
                </div>
                <div className="userData">
                    <label>Email:</label>
                    <div>durgaking@gmail.com</div>
                </div>
                <div className="userData">
                    <label>Phone No:</label>
                    <div>9381736150</div>
                </div>
            </div>
            <div className="dashLinks">
                <div className="dashLink"><p onClick={() => setPage('dashboard')}>Dashboard</p></div>
                <div className="dashLink"><p onClick={() => setPage('attendance')}>Attendance</p></div>
                <div className="dashLink">
                    <p onClick={() => setPage('payslips')}>Pay Rolls</p>
                    <ul className="dashDropDownList">
                        <li onClick={() => setPage('payslips')}>Pay Slips</li>
                        <li onClick={() => setPage('generate')}>Genarate</li>
                    </ul>
                </div>
                <div className="dashLink">
                    <p onClick={() => setPage('leave')}>Leave</p>
                    <ul className="dashDropDownList">
                        <li onClick={() => setPage('leave')}>Details</li>
                        <li onClick={() => setPage('applyleave')}>Apply for leave</li>
                    </ul>
                </div>
            </div>
        </div>
        {page === 'dashboard' && <Dashboard/>}
        {page === 'attendance' && <Attendance/>}
        {page === 'payslips' && <Payslips/>}
        {page === 'generate' && <Uploadfile/>}
        {page === 'leave' && <Leave/>}
        {page === 'applyleave' && <LeaveForm/>}
    </div>
  )
}

export default Hero