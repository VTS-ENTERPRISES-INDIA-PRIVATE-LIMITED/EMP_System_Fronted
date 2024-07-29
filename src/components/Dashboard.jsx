import React from "react";

const Dashboard = () => {
    return (
        <div className="dashBoardPage">
            <div className="loginCard">
                <div>
                    <p><b>Good to see you Raj...! 👋</b></p>
                    <p>you came 15mins earlier today.</p>
                </div>
                <div className="loginCont">
                    <img src={process.env.PUBLIC_URL + 'assets/images/login.png'} alt="" />
                    <div className="loginTime">
                        <b>Login</b>
                        <p>8:45 AM</p>
                    </div>
                </div>
                <div className="loginCont">
                    <img src={process.env.PUBLIC_URL + 'assets/images/logout.png'} alt="" />
                    <div className="loginTime">
                        <b>Logout</b>
                        <p>5:00 PM</p>
                    </div>
                </div>
            </div>
            <div className="loginCard">
                <div>
                    <p><b>Total number of leaves</b></p>
                    <p>10 days</p>
                </div>
                <div>
                    <b>Used</b>
                    <p>5 days</p>
                </div>
                <div>
                    <b>Available</b>
                    <p>5 days</p>
                </div>
            </div>
            <table className="anouncements">
                <thead>
                    <th><b>Date</b></th>
                    <th><b>Announcement</b></th>
                    <th><b>Photos</b></th>
                </thead>
                <tbody>
                    <tr>
                        <td>15/07/2024</td>
                        <td>5th Anniversary</td>
                        <td><img src={process.env.PUBLIC_URL + 'images/anniversary.png'} alt="" /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard