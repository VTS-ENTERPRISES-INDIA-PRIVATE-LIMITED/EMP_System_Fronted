import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaSortAmountDown } from "react-icons/fa";

const GeneratePayslips = async (Employee) => {
  // Create the HTML content as a string
  const formatCurrency = (amount) => {
    const formattedAmount = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
    return formattedAmount.replace('₹', '₹');
  };
  const numberToWords = (num) => {
    const a = [
      '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven',
      'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
    ];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const g = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
  
    const makeGroup = (digits) => {
      let [huns, tens, ones] = digits;
      let groupText = '';
  
      if (huns !== '0') {
        groupText += `${a[huns]} Hundred `;
      }
  
      if (tens === '1') {
        groupText += `${a[10 + Number(ones)]} `;
      } else {
        if (tens !== '0') {
          groupText += `${b[tens]}`;
          if (ones !== '0') {
            groupText += `-${a[ones]} `;
          } else {
            groupText += ` `;
          }
        } else {
          if (ones !== '0') {
            groupText += `${a[ones]} `;
          }
        }
      }
  
      return groupText.trim();
    };
  
    const thousand = (group, i) => group === '' ? group : `${group} ${g[i]}`;
  
    if (num === 0) return 'Zero';
  
    const numStr = num.toString();
    const groups = [];
    for (let i = 0; i < numStr.length; i += 3) {
      groups.push(numStr.slice(Math.max(0, numStr.length - 3 - i), numStr.length - i).padStart(3, '0').split(''));
    }
  
    const groupWords = groups.map(makeGroup).map(thousand).filter(Boolean).reverse();
    const result = groupWords.join(' ').trim();
  
    return result.charAt(0).toUpperCase() + result.slice(1);
  };
  console.log(Employee)
  //Employee Data
  const grossSalary = formatCurrency(Employee.grossSalary)
  const netsalaryInwords = numberToWords(parseInt(Employee.grossSalary)-parseInt(Employee.deducts))
  const Employeename = Employee.name
  const EmployeeId = Employee.empId
  const paidDays = Employee.workingdays
  const LOP = Employee.lop
  const BASE = formatCurrency(Employee.base)
  const HRA = formatCurrency(Employee.HRA)
  const SPA = formatCurrency(Employee.SPA)
  const CNA = formatCurrency(Employee.CNA)
  const medicalAllowance = formatCurrency(Employee.medicalAllowance)
  const otherAllowances = formatCurrency(Employee.otherAllowances)
  const incomeTax = formatCurrency(Employee.incomeTax)
  const providentFund = formatCurrency(Employee.providentFund)
  const otherDeducts = formatCurrency(Employee.otherDeducts)
  const totalDeductions = parseInt(Employee.incomeTax)+parseInt(Employee.providentFund)+parseInt(Employee.otherDeducts)
  const netSalary = formatCurrency(parseInt(Employee.grossSalary)-parseInt(totalDeductions))

  const UINnumber = "VTS202500123"
  const pfNumber = "PFVTS00020250123"
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
                  <td>${Employeename}</td>
                </tr>
                <tr>
                  <td><strong>Employee ID</strong></td>
                  <td>:</td>
                  <td>${EmployeeId}</td>
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
                  <td>: </td>
                  <td>${UINnumber}</td>
                </tr>
                <tr>
                  <td><strong>PF Number</strong></td>
                  <td>: </td>
                  <td>${pfNumber}</td>
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
                <p style="margin: 8px 0 0 0; padding: 0 15px; font-size: 24px; font-weight: bold; color: #448d46;">${netSalary}</p>
                <p style="margin: 0 0 5px 0; padding: 3px 0 0 15px; font-size: 14px;"><strong>Employee Net Pay</strong></p>
              </div>
            </div>
            <hr style="margin: 0 10px;" />
            <p style="padding: 3px 0; padding-left: 15px; margin: 5px 0 0 0; font-size: 14px;">Paid Days: <b>${paidDays}</b></p>
            <p style="padding: 3px 0; padding-left: 15px; margin: 5px 0 0 0; font-size: 14px;">LOP Days: <b>${LOP}</b></p>
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
              <td style="padding: 10px; text-align: left;">${BASE}</td>
              <td style="padding: 10px; text-align: left;">Income Tax</td>
              <td style="padding: 10px; text-align: left;">${incomeTax}</td>
            </tr>
            <tr>
              <td style="padding: 10px; text-align: left;">House Rent Allowance</td>
              <td style="padding: 10px; text-align: left;">${HRA}</td>
              <td style="padding: 10px; text-align: left;">Provident Fund</td>
              <td style="padding: 10px; text-align: left;">${providentFund}</td>
            </tr>
            <tr>
              <td style="padding: 10px; text-align: left;">Special Allowance</td>
              <td style="padding: 10px; text-align: left;">${SPA}</td>
              <td style="padding: 10px; text-align: left;">Other Deductions</td>
              <td style="padding: 10px; text-align: left;">${otherDeducts}</td>
            </tr>
            <tr>
              <td style="padding: 10px; text-align: left;">Conveyance Allowance</td>
              <td style="padding: 10px; text-align: left;">${CNA}</td>
              <td style="padding: 10px; text-align: left;"></td>
              <td style="padding: 10px; text-align: left;"></td>
            </tr>
            <tr>
              <td style="padding: 10px; text-align: left;">Medical Allowance</td>
              <td style="padding: 10px; text-align: left;">${medicalAllowance}</td>
              <td style="padding: 10px; text-align: left;"></td>
              <td style="padding: 10px; text-align: left;"></td>
            </tr>
            <tr>
              <td style="padding: 10px; text-align: left;">Other Allowance</td>
              <td style="padding: 10px; text-align: left;">${otherAllowances}</td>
              <td style="padding: 10px; text-align: left;"></td>
              <td style="padding: 10px; text-align: left;"></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td style="padding: 10px; text-align: left; font-weight: bold;">Gross Earnings</td>
              <td style="padding: 10px; text-align: left; font-weight: bold;">${grossSalary}</td>
              <td style="padding: 10px; text-align: left; font-weight: bold;">Total Deductions</td>
              <td style="padding: 10px; text-align: left; font-weight: bold;">${formatCurrency(totalDeductions)}</td>
            </tr>
            <tr style="border: 2px solid black;">
              <td style="padding: 10px; text-align: left; font-weight: bold;">Net Earnings</td>
              <td style="padding: 10px; text-align: left; font-weight: bold;">${netSalary}</td>
              <td style="padding: 10px; text-align: left;"></td>
              <td style="padding: 10px; text-align: left;"></td>
            </tr>
          </tfoot>
        </table>
        <center>
                <p style="margin-top:20px";font-size:12px"><strong>Amount In Words: ${netsalaryInwords} Only/-</strong></p>
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
    formData.append("file", pdfBlob, `${Employee.empId}-${new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}.pdf`);
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
      const url = `${process.env.REACT_APP_BACKEND_URL}/admin/savepayslips`
      await axios.post(url,{empId:Employee.empId,payslipUrl:response.data.secure_url})
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
