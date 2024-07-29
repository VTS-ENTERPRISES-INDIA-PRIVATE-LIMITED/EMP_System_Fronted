import "./App.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Uploadfile from "./components/Uploadfile";
import Pdf from "./components/Pdf";
import html2canvas from "html2canvas";
import axios from "axios";
import jsPDF from "jspdf";
import logo from "./assets/images/vts-logo-payroll.jpeg";
import { useState } from "react";
function App() {
  const [pdffile,setPdfFile] = useState()
  const downloadPdf = async () => {
    const element = document.getElementById("printdf");
    console.log(element)
   
    const canvas = await html2canvas(element, { scale: 1.8 });
    const imgData = canvas.toDataURL("image/png");
  
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });
  
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, undefined, "FAST");

    const pdfBlob = pdf.output("blob");
 
    const formData = new FormData();
    formData.append("file", pdfBlob, "document.pdf");
    formData.append("upload_preset", "payslips");
  
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dtgnotkh7/auto/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.secure_url);
    } catch (error) {
      if (error.response) {
        console.error("Error uploading image:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
    }
  };
  return (
    <>
    <input type="file" onChange={(e)=>setPdfFile(e.target.files[0])}/>
      <div id="printdf" style={({
        backgroundColor: '#f5f5f5',
        width: 'fit-content',
        minHeight: '297mm',
        marginLeft: 'auto',
        marginRight: 'auto'
      })}>
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #dcdcdc', width: '800px', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #dcdcdc', paddingBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={logo} alt="Company Logo" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                    <div>
                        <h1 style={{ fontSize: '34px', margin: '0' }}>VTS</h1>
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <h2 style={{ margin: '0', fontSize: '18px' }}>Payslip For the Month</h2>
                    <h3 style={{ margin: '5px 0 0 0', fontSize: '16px' }}>July 2024</h3>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 60px', borderBottom: '2px solid #dcdcdc' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <table>
                        <tbody>
                            <tr style={{ padding: '10px 0' }}>
                                <td><strong>Employee name</strong></td>
                                <td>:</td>
                                <td>$name</td>
                            </tr>
                            <tr>
                                <td><strong>Employee ID</strong></td>
                                <td>:</td>
                                <td>$EmployeeId</td>
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
                        </tbody>
                    </table>
                </div>
                <div style={{ textAlign: 'left', borderRadius: '10px', border: '1px solid rgb(162, 159, 159)' }}>
                    <div style={{ display: 'flex', position: 'relative' }}>
                        <div style={{ position: 'absolute', left: '7px', top: '12px', borderRadius: '5px', backgroundColor: 'rgb(75, 112, 53)', height: '40px', width: '3px' }}>
                            <p></p>
                        </div>
                        <div style={{ borderTopLeftRadius: '6px', borderTopRightRadius: '6px', backgroundColor: 'rgba(0, 255, 8, 0.25)' }}>
                            <p style={{ margin: '8px 0 0 0', padding: '0 15px', fontSize: '24px', fontWeight: 'bold', color: '#448d46' }}>₹59,000.00</p>
                            <p style={{ margin: '0 0 5px 0', padding: '3px 0 0 15px', fontSize: '14px' }}><strong>Employee Net Pay</strong></p>
                        </div>
                    </div>
                    <hr style={{ margin: '0 10px' }} />
                    <p style={{ padding: '3px 0', paddingLeft: '15px', margin: '5px 0 0 0', fontSize: '14px' }}>Paid Days: <b>23</b></p>
                    <p style={{ padding: '3px 0', paddingLeft: '15px', margin: '5px 0 0 0', fontSize: '14px' }}>LOP Days: <b>0</b></p>
                </div>
            </div>
            <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '10px', textAlign: 'left', backgroundColor: '#f1f1f1' }}>EARNINGS</th>
                        <th style={{ padding: '10px', textAlign: 'left', backgroundColor: '#f1f1f1' }}>AMOUNT</th>
                        <th style={{ padding: '10px', textAlign: 'left', backgroundColor: '#f1f1f1' }}>DEDUCTIONS</th>
                        <th style={{ padding: '10px', textAlign: 'left', backgroundColor: '#f1f1f1' }}>AMOUNT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ padding: '10px', textAlign: 'left' }}>Basic</td>
                        <td style={{ padding: '10px', textAlign: 'left' }}>₹23,600.00</td>
                        <td style={{ padding: '10px', textAlign: 'left' }}>Income Tax</td>
                        <td style={{ padding: '10px', textAlign: 'left' }}>₹0.00</td>
                    </tr>
                    <tr>
                        <td style={{ padding: '10px', textAlign: 'left' }}>House Rent Allowance</td>
                        <td style={{ padding: '10px', textAlign: 'left' }}>₹11,800.00</td>
                        <td style={{ padding: '10px', textAlign: 'left' }}>Provident Fund</td>
                        <td style={{ padding: '10px', textAlign: 'left' }}>₹0.00</td>
                    </tr>
                    <tr>
                        <td style={{ padding: '10px', textAlign: 'left' }}>Special Allowance</td>
                        <td style={{ padding: '10px', textAlign: 'left' }}>₹11,800.00</td>
                        <td style={{ padding: '10px', textAlign: 'left' }}>Other Deductions</td>
                        <td style={{ padding: '10px', textAlign: 'left' }}>₹0.00</td>
                    </tr>
                    <tr>
                        <td style={{ padding: '10px', textAlign: 'left' }}>Conveyance Allowance</td>
                        <td style={{ padding: '10px', textAlign: 'left' }}>₹5,900.00</td>
                        <td style={{ padding: '10px', textAlign: 'left' }}></td>
                        <td style={{ padding: '10px', textAlign: 'left' }}></td>
                    </tr>
                    <tr>
                        <td style={{ padding: '10px', textAlign: 'left' }}>Medical Allowance</td>
                        <td style={{ padding: '10px', textAlign: 'left' }}>₹2,950.00</td>
                        <td style={{ padding: '10px', textAlign: 'left' }}></td>
                        <td style={{ padding: '10px', textAlign: 'left' }}></td>
                    </tr>
                    <tr>
                        <td style={{ padding: '10px', textAlign: 'left' }}>Other Allowance</td>
                        <td style={{ padding: '10px', textAlign: 'left' }}>₹2,950.00</td>
                        <td style={{ padding: '10px', textAlign: 'left' }}></td>
                        <td style={{ padding: '10px', textAlign: 'left' }}></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Gross Earnings</td>
                        <td style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>₹59,000.00</td>
                        <td style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Total Deductions</td>
                        <td style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>₹0.00</td>
                    </tr>
                    <tr style={{ border: '1px solid black' }}>
                        <td style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Total Net Payable</td>
                        <td style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>₹59,000.00</td>
                        <td colSpan="2" style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>&nbsp;</td>
                    </tr>
                </tfoot>
            </table>
            <center>
                <p style={{ marginTop: '20px', fontSize: '12px' }}><strong>Amount In Words: Fifty-Nine Thousand Only/-</strong></p>
                <hr />
                <p style={{ fontSize: '12px', color: '#777' }}><i className="fa fa-map-marker" style={{ fontSize: '13px' }}></i> First Floor, SRP Stratford, Rajiv Gandhi Salai, PTK Nagar, OMR 600100 India</p>
            </center>
            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#777' }}>-- This is a system-generated document. --</p>
        </div>
      </div>
      <Navbar />
      <Hero />
      {/* <Uploadfile/> */}
      {/* <Pdf /> */}
      <button onClick={downloadPdf}>Download payslip</button>
    </>
  );
}

export default App;
