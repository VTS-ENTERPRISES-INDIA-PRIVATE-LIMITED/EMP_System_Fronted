import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { Space, Table, Tag } from "antd";

const columns = [
  {
    title: "Title",
    dataIndex: "name",
    key: "title",
  },
  {
    title: " Date",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Action",
    dataIndex: "address",
    key: "address",
  },
];
const data = [
  {
    key: "1",
    // name: "John Brown",
    // age: 32,
    // address: "New York No. 1 Lake Park",
  },
];
const Payslips = ({ empId }) => {
  const [pdfs, setPayslipData] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const pdfRef = useRef();

  // const pdfs = [
  //     {empid: "VTS2025051", month: "may", year: '2025', url: "qwertyuio",},
  //     {empid: "VTS2025051", month: "may", year: '2024', url: "qwertyuio",},
  //     {empid: "VTS2025051", month: "june", year: '2024', url: "qwertyuio",}
  // ]

  useEffect(() => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/admin/getpayslips/${empId}`;
    axios
      .get(url)
      .then((res) => {
        setPayslipData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDownload = (pdfUrl) => {
    if (pdfUrl === "") {
      alert("No Data..!");
    } else {
      fetch(pdfUrl)
        .then((response) => {
          response.blob().then((blob) => {
            const fileURL = window.URL.createObjectURL(blob);
            let alink = document.createElement("a");
            alink.href = fileURL;
            const filename = pdfUrl.split("/").pop() || "document.pdf";
            alink.download = filename.endsWith(".pdf")
              ? filename
              : `${filename}.pdf`;
            alink.click();
          });
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
          setSelectedPdf("");
        });
    }
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const filterPdfs = () => {
    let filteredPdfs = pdfs;

    if (selectedMonth) {
      filteredPdfs = filteredPdfs.filter((pdf) => pdf.month === selectedMonth);
    }
    if (selectedYear) {
      filteredPdfs = filteredPdfs.filter((pdf) => pdf.year === selectedYear);
    }

    return filteredPdfs;
  };

  useEffect(() => {
    return () => {
      if (selectedPdf) {
        URL.revokeObjectURL(selectedPdf);
      }
    };
  }, [selectedPdf]);

  const filteredPdfs = filterPdfs();

  return (
    <div className="paySlipCont">
      <div className="payRollDetails">
        <div className="dateFilter">
          <label style={{ marginRight: "30px" }}>
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              style={{ padding: "3px" }}
            >
              <option value="">Select Month</option>
              {Array.from(new Set(pdfs.map((pdf) => pdf.month))).map(
                (month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                )
              )}
            </select>
          </label>
          <label>
            <select value={selectedYear} onChange={handleYearChange}>
              <option value="">Select Year</option>
              {Array.from(new Set(pdfs.map((pdf) => pdf.year))).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="PaySlip-Table">
          <Table columns={columns} dataSource={data} />
          {/* <table className="dataTable" border={"1px"}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPdfs.length > 0 ? (
                filteredPdfs.map((pdf) => (
                  <tr key={pdf.empid}>
                    <td>{pdf.month} Month Payslip</td>
                    <td>
                      {pdf.month} {pdf.year}
                    </td>
                    <td className="tableBtns">
                      <FaRegEye
                        style={{
                          fontSize: "20px",
                          cursor: "pointer",
                          color: "blue",
                          marginRight: "10px",
                        }}
                        onClick={() => setSelectedPdf(pdf.url)}
                      />
                      <MdOutlineFileDownload
                        style={{
                          fontSize: "20px",
                          cursor: "pointer",
                          color: "blue",
                        }}
                        onClick={() => handleDownload(pdf.url)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No Data Available</td>
                </tr>
              )}
            </tbody>
          </table> */}
        </div>
      </div>
      <div className="payRollPreview">
        {selectedPdf ? (
          <div ref={pdfRef}>
            <iframe
              src={selectedPdf}
              width="100%"
              height="750px"
              title="PDF Viewer"
            ></iframe>
          </div>
        ) : (
          <div className="noData">
            <img
              src={process.env.PUBLIC_URL + "assets/images/box.png"}
              alt="No Data"
            />
            <p>No Data</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payslips;
