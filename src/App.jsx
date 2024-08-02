import "./App.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import html2canvas from "html2canvas";
import axios from "axios";
import jsPDF from "jspdf";
import { useState } from "react";
import GeneratePayslips from "./components/GeneratePayslips";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Payslips from "./components/Payslips";
import AddEmployee from "./components/AddEmployee";
function App() {
  const downloadPdf = async () => {
    
    GeneratePayslips({name:"KOTESWARA RAO PAKEERI",empId:"VTS2025040",grossSalary:86400,deducts:500,base:51000})
  }
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/dashboard" element={<><Navbar />
        <Hero /></>} />
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<AddEmployee />} />
        <Route path="/reset-password" element={<SignUp />} />
    </Routes>
    </BrowserRouter>
      
      
      {/* <button onClick={downloadPdf}>Download payslip</button> */}
    </>
  );
}

export default App;
