import "./App.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import GeneratePayslips from "./components/GeneratePayslips";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Signup";
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
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<SignUp />} />
    </Routes>
    </BrowserRouter>
      
      
      {/* <button onClick={downloadPdf}>Download payslip</button> */}
    </>
  );
}

export default App;
