import React from 'react';
import Payslips from './Payslips';
import Uploadfile from './Uploadfile';

const Hero = () => {
  return (
    <div className='heroSection'>
        <div className="dashboard">
            <div className="userDetails">
                <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="" className="userProfile" />
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
                <div className="dashLink"><p>Dashboard</p></div>
                <div className="dashLink"><p>Attendance</p></div>
                <div className="dashLink">
                    <p>Pay Rolls</p>
                    <ul className="dashDropDownList">
                        <li>Pay Slips</li>
                        <li>Details</li>
                    </ul>
                </div>
                <div className="dashLink"><p>Leave</p></div>
            </div>
        </div>
        {/* <Payslips/> */}
        <Uploadfile/>
    </div>
  )
}

export default Hero