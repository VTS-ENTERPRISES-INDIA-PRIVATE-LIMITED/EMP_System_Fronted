import React from 'react'

const Pdf = () => {
  return (
    <div className="payslip-container">
        <div className="header">
            <div className="company-info">
                <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="Company Logo" className="logo"/>
                <div>
                    <h1 style={{paddingTop: "5px"}}>VTS</h1>
                </div>
            </div>
            <div className="payslip-title">
                <h2>Payslip For the Month</h2>
                <h3>July 2024</h3>
            </div>
        </div>
        <div className="employee-summary">
            <div className="employee-info">
                <table>
                    <tr style={{padding: "10px 0px"}}>
                        <td><strong>Employee name</strong></td>
                        <td>:</td>
                        <td>Random Name</td>
                    </tr>
                    <tr>
                        <td><strong>Employee ID</strong></td>
                        <td>:</td>
                        <td>VTS2024858</td>
                    </tr>
                    <tr>
                        <td><strong>Pay Period</strong></td>
                        <td>:</td>
                        <td>July 2024</td>
                    </tr>
                    <tr>
                        <td><strong>Pay Date</strong></td>
                        <td>:</td>
                        <td>01/07/2024</td>
                    </tr>
                    <tr>
                        <td><strong>UIN Number</strong></td>
                        <td>:</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><strong>PF Number</strong></td>
                        <td>:</td>
                        <td></td>
                    </tr>
                </table>
            </div>
            <div className="net-pay">
                <div className="net-pay-main">
                    <div className="small">
                        <p></p>
                    </div>
                    <div className="small-in">
                        <p className="net-amount" style={{margin: "8px 0px 0px 0px"}}>₹59,000.00</p>
                        <p style={{margin: "0px 0px 5px 0px"}}><strong>Employee Net Pay</strong></p>
                    </div>
                </div>
                <hr style={{margin: "0px 10px"}}/>
                <p>Paid Days: 23</p>
                <p>LOP Days: 0</p>
            </div>
        </div>
        <table className="earnings-deductions">
            <thead>
                <tr>
                    <th>EARNINGS</th>
                    <th>AMOUNT</th>
                    <th>DEDUCTIONS</th>
                    <th>AMOUNT</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Basic</td>
                    <td>₹23,600.00</td>
                    <td>Income Tax</td>
                    <td>₹0.00</td>
                </tr>
                <tr>
                    <td>House Rent Allowance</td>
                    <td>₹11,800.00</td>
                    <td>Provident Fund</td>
                    <td>₹0.00</td>
                </tr>
                <tr>
                    <td>Special Allowance</td>
                    <td>₹11,800.00</td>
                    <td>Other Deductions</td>
                    <td>₹0.00</td>
                </tr>
                <tr>
                    <td>Conveyance Allowance</td>
                    <td>₹5,900.00</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Medical Allowance</td>
                    <td>₹2,950.00</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Other Allowance</td>
                    <td>₹2,950.00</td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td><strong>Gross Earnings</strong></td>
                    <td><strong>₹59,000.00</strong></td>
                    <td><strong>Total Deductions</strong></td>
                    <td><strong>₹0.00</strong></td>
                </tr>
                <tr style={{border: "1px solid black"}}>
                    <td><strong>Total Net Payable</strong></td>
                    <td><strong>₹59,000.00</strong></td>
                    <td colspan="2"><strong>&nbsp;
                    </strong></td>
                </tr>
            </tfoot>
        </table>
        <center><p><strong>Amount In Words: Indian Rupee Fifty-Nine Thousand Only</strong></p></center><hr/>
        <center><p>First Floor, SRP Stratford, Rajiv Gandhi Salai, PTK Nagar, OMR 600100 India</p></center>
        <p className="footer-note">-- This is a system-generated document. --</p>
    </div>
  )
}

export default Pdf