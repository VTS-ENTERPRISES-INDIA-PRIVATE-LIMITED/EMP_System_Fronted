import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const GeneratePayslips = async (Employee) => {
  // Create the HTML content as a string
  console.log(Employee)
  const htmlContent = `
    <div id="printdf" style="background-color: #f5f5f5; width: fit-content; min-height: 297mm; margin-left: auto; margin-right: auto;">
      <div style="background-color: #ffffff; border: 1px solid #dcdcdc; width: 800px; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #dcdcdc; padding-bottom: 10px;">
          <div style="display: flex; align-items: center;">
            <img src="${process.env.PUBLIC_URL + 'assets/images/vts-logo-payroll.jpeg'}" alt="Company Logo" style="width: 50px; height: 50px; margin-right: 10px;" />
            <div>
              <h1 style="font-size: 34px; margin: 0;">VTS</h1>
            </div>
          </div>
          <div style="text-align: right;">
            <h2 style="margin: 0; font-size: 18px;">Payslip For the Month</h2>
            <h3 style="margin: 5px 0 0 0; font-size: 16px;">July 2024</h3>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 20px 60px; border-bottom: 2px solid #dcdcdc;">
          <div style="display: flex; flex-direction: column;">
            <table>
              <tbody>
                <tr style="padding: 10px 0;">
                  <td><strong>Employee name</strong></td>
                  <td>:</td>
                  <td>${Employee.name}</td>
                </tr>
                <tr>
                  <td><strong>Employee ID</strong></td>
                  <td>:</td>
                  <td>${Employee.empId}</td>
                </tr>
                <tr>
                  <td><strong>Pay Period</strong></td>
                  <td>:</td>
                  <td>${new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</td>
                </tr>
                <tr>
                  <td><strong>Pay Date</strong></td>
                  <td>:</td>
                  <td>${new Date().toLocaleDateString('en-GB')}</td>
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
          <div style="text-align: left; border-radius: 10px; border: 1px solid rgb(162, 159, 159);">
            <div style="display: flex; position: relative;">
              <div style="position: absolute; left: 7px; top: 12px; border-radius: 5px; background-color: rgb(75, 112, 53); height: 40px; width: 3px;">
                <p></p>
              </div>
              <div style="border-top-left-radius: 6px; border-top-right-radius: 6px; background-color: rgba(0, 255, 8, 0.25);">
                <p style="margin: 8px 0 0 0; padding: 0 15px; font-size: 24px; font-weight: bold; color: #448d46;">₹${Employee.salary}</p>
                <p style="margin: 0 0 5px 0; padding: 3px 0 0 15px; font-size: 14px;"><strong>Employee Net Pay</strong></p>
              </div>
            </div>
            <hr style="margin: 0 10px;" />
            <p style="padding: 3px 0; padding-left: 15px; margin: 5px 0 0 0; font-size: 14px;">Paid Days: <b>23</b></p>
            <p style="padding: 3px 0; padding-left: 15px; margin: 5px 0 0 0; font-size: 14px;">LOP Days: <b>0</b></p>
          </div>
        </div>
        <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="padding: 10px; text-align: left; background-color: #f1f1f1;">EARNINGS</th>
              <th style="padding: 10px; text-align: left; background-color: #f1f1f1;">AMOUNT</th>
              <th style="padding: 10px; text-align: left; background-color: #f1f1f1;">DEDUCTIONS</th>
              <th style="padding: 10px; text-align: left; background-color: #f1f1f1;">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 10px; text-align: left;">Basic</td>
              <td style="padding: 10px; text-align: left;">₹23,600.00</td>
              <td style="padding: 10px; text-align: left;">Income Tax</td>
              <td style="padding: 10px; text-align: left;">₹0.00</td>
            </tr>
            <tr>
              <td style="padding: 10px; text-align: left;">House Rent Allowance</td>
              <td style="padding: 10px; text-align: left;">₹11,800.00</td>
              <td style="padding: 10px; text-align: left;">Provident Fund</td>
              <td style="padding: 10px; text-align: left;">₹0.00</td>
            </tr>
            <tr>
              <td style="padding: 10px; text-align: left;">Special Allowance</td>
              <td style="padding: 10px; text-align: left;">₹11,800.00</td>
              <td style="padding: 10px; text-align: left;">Other Deductions</td>
              <td style="padding: 10px; text-align: left;">₹0.00</td>
            </tr>
            <tr>
              <td style="padding: 10px; text-align: left;">Conveyance Allowance</td>
              <td style="padding: 10px; text-align: left;">₹5,900.00</td>
              <td style="padding: 10px; text-align: left;"></td>
              <td style="padding: 10px; text-align: left;"></td>
            </tr>
            <tr>
              <td style="padding: 10px; text-align: left;">Medical Allowance</td>
              <td style="padding: 10px; text-align: left;">₹2,950.00</td>
              <td style="padding: 10px; text-align: left;"></td>
              <td style="padding: 10px; text-align: left;"></td>
            </tr>
            <tr>
              <td style="padding: 10px; text-align: left;">Other Allowance</td>
              <td style="padding: 10px; text-align: left;">₹2,950.00</td>
              <td style="padding: 10px; text-align: left;"></td>
              <td style="padding: 10px; text-align: left;"></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td style="padding: 10px; text-align: left; font-weight: bold;">Gross Earnings</td>
              <td style="padding: 10px; text-align: left; font-weight: bold;">₹59,000.00</td>
              <td style="padding: 10px; text-align: left; font-weight: bold;">Total Deductions</td>
              <td style="padding: 10px; text-align: left; font-weight: bold;">₹0.00</td>
            </tr>
            <tr style="border: 2px solid black;">
              <td style="padding: 10px; text-align: left; font-weight: bold;">Net Earnings</td>
              <td style="padding: 10px; text-align: left; font-weight: bold;">₹59,000.00</td>
              <td style="padding: 10px; text-align: left;"></td>
              <td style="padding: 10px; text-align: left;"></td>
            </tr>
          </tfoot>
        </table>
        <center>
                <p style="margin-top:20px";font-size:12px"><strong>Amount In Words: Fifty-Nine Thousand Only/-</strong></p>
                <hr />
                <p style="font-size:12px ; color:#777 ; margin-top:20px"><i class="fa fa-map-marker" style="font-size:13px"></i> First Floor, SRP Stratford, Rajiv Gandhi Salai, PTK Nagar, OMR 600100 India</p>
            </center>
            <p style="text-align: center; margin-top: 20px; font-size: 12px; color: #777">-- This is a system-generated document. --</p>
        
      </div>
    </div>
  `;

  const hiddenElement = document.createElement('div');
  hiddenElement.style.position = 'fixed';
  hiddenElement.style.left = '-9999px';
  hiddenElement.innerHTML = htmlContent;
  document.body.appendChild(hiddenElement);

  const element = document.getElementById("printdf");

    const canvas = await html2canvas(element, { scale: 2});
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

    document.body.removeChild(hiddenElement);
  
};


export default GeneratePayslips
