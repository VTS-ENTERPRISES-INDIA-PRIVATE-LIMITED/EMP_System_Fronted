import "./App.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import html2canvas from "html2canvas";
import axios from "axios";
import jsPDF from "jspdf";
import { useState } from "react";
import GeneratePayslips from "./components/GeneratePayslips";
function App() {
  const downloadPdf = async () => {
    
    GeneratePayslips({name:"KOTESWARA RAO PAKEERI",empId:"VTS2025040",grossSalary:86400,deducts:500,base:51000})
  }
  
  return (
    <>
      <Navbar />
      <Hero />
      <button onClick={downloadPdf}>Download payslip</button>
    </>
  );
}

export default App;
