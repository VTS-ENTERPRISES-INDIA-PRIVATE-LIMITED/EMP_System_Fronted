import React, { useEffect, useState } from 'react'
import axios from 'axios'


const ViewEmp = () => {
  const [viewData, setViewData] = useState({Name: '', email : '', phone : '', role: '', id: ''})
  const [dataList, setDataList] = useState()
  const [editName, setEditName] = useState()
  const [editemail, setEditemail] = useState()
  const [editphone, setEditphone] = useState()
  const [editrole, setEditrole] = useState()
  const [Message, setMessage] = useState()
  const [validMessage, setvalidMessage] = useState({Name : '', email : '', phone : '', role: '', id: ''})
  const [validity, setValidity] = useState(true)

  // const [editData, setEditData] = useState({id:viewData.id ,Name: viewData.Name, email : viewData.email, phone : viewData.phone, role: viewData.role})
  
  const handleView = () =>{
    const url = `http://localhost:5000/admin/viewEmp`;
    axios.post(url)
    .then((res)=>{
      setDataList(res.data)
    })
  }

  const handleEdit = async (Id) => {
    const url = `http://localhost:5000/admin/updateEmp/${Id}`
    axios.post(url, {editName,editemail,editphone,editrole})
    .then((res) => {
      setMessage(res.data.message)
    })
  }

  const handleShowEditForm = (Id) =>{
    const url = `http://localhost:5000/admin/viewEmp/${Id}`
    axios.post(url)
    .then((res)=>{
      setViewData({id:Id ,Name : res.data[0][0].Name, email : res.data[0][0].email, phone : res.data[0][0].phone, role : res.data[0][0].role})
      setEditName(res.data[0][0].Name)
      setEditemail(res.data[0][0].email)
      setEditphone(res.data[0][0].phone)
      setEditrole(res.data[0][0].role)
    }) 
  }

  const handleDelete = (Id) => {
    const url =  `http://localhost:5000/admin/deleteEmp/${Id}`
    
    axios.post(url)
    .then(()=>console.log('deleted successfully'))
  }
  
  const validName = /[\D]{6,}/
  const emailPattern =/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i
  const phonePattern = /[0-9]{10}/
  const validateName = (Name) => {
    if(!validName.test(Name))
    {
      setvalidMessage({...validMessage, Name :'Enter a valid username'})
      setValidity(false)}
    else{
      setvalidMessage({...validMessage, Name :''})
      setValidity(true)
    }
  }
  const validateEmail = (email) => {
    if(!emailPattern.test(email))
    {
     setvalidMessage({...validMessage, email :'Enter a valid email'})
     setValidity(false)}
    else{
      console.log('')
       setvalidMessage({...validMessage, email :''})
       setValidity(true)
    }
  }
  const validatePhone = (phone) => {
    if(!phonePattern.test(phone))
    {
     setvalidMessage({...validMessage, phone :'Enter a valid phone number'})
     setValidity(false)}
    else{
      console.log('')
       setvalidMessage({...validMessage, phone :''})
       setValidity(true)
    }
  }


  useEffect(handleView, [])
  useEffect(handleView, [dataList])

  return (
    <div className="viewCont">
      <div className='viewContDiv'>
        <table className='viewContTable'>
          <thead>
            <tr>
            <th>S.No</th>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Employee Role</th>
            <th>Edit</th>
            <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {dataList?.map((empDet, index)=>{
              return(<tr  key = {empDet.empId}>
                <td>{index+1}</td>
                <td>{empDet.empId}</td>
                <td>{empDet.Name}</td>
                <td>{empDet.role}</td>
                <td><button onClick={
                  ()=>
                  handleShowEditForm(empDet.empId)} className='editBtn'>Edit</button></td>
                <td><button className='DelBtn' onClick={()=>handleDelete(empDet.empId)}>Delete</button></td>
              </tr>)
            })
            }
          </tbody>
        </table>
        </div>
      <div className="editEmp" id="editEmp" style={{display:(viewData.Name==="")?"none":"flex"}}>
        <form action="" className="editEmpform">
          <button type='button' className='cancelBtn' 
          onClick={()=>setViewData({Name : ""})}>x</button>
          <input type="text" className='editEmpInp' defaultValue={viewData.Name} 
          onChange={(e)=>{
            validateName(e.target.value)
            setEditName(e.target.value)}}/>
            {validMessage.Name && <span className='invalidMsg'>{validMessage.Name}</span>}
          <input type="text" className='editEmpInp' defaultValue={viewData.email} 
          onChange={(e)=>{
            validateEmail(e.target.value)
            setEditemail(e.target.value)}}/>
            {validMessage.email && <span className='invalidMsg'>{validMessage.email}</span>}
          <input type="text" className='editEmpInp' defaultValue={viewData.phone} 
          onChange={(e)=>{
            validatePhone(e.target.value)
            setEditphone(e.target.value)}}/>
            {validMessage.phone && <span className='invalidMsg'>{validMessage.phone}</span>}
          <select className='editEmpSelect' value={editrole}
          onChange={(e)=>{
            setEditrole(e.target.value)
            }}>
            <option value="Employee">Employee</option>
            <option value="admin">admin</option>
            <option value="hr">hr</option>
          </select>
          <button type='submit' className='subButton' onClick={(e)=>{
            e.preventDefault()
            handleEdit(viewData.id)
            setViewData({Name : ""})
          }}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default ViewEmp