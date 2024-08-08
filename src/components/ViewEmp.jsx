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

  // const [editData, setEditData] = useState({id:viewData.id ,Name: viewData.Name, email : viewData.email, phone : viewData.phone, role: viewData.role})
  
  const handleView = () =>{
    const url = `${process.env.REACT_APP_BACKEND_URL}/admin/viewEmp`;
    axios.post(url)
    .then((res)=>{
      setDataList(res.data)
    })
  }

  const handleEdit = async (Id) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/admin/updateEmp/${Id}`
    axios.post(url, {editName,editemail,editphone,editrole})
    .then((res) => {
      setMessage(res.data.message)
    })
  }

  const handleShowEditForm = (Id) =>{
    const url = `${process.env.REACT_APP_BACKEND_URL}/admin/viewEmp/${Id}`
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
    const url =  `${process.env.REACT_APP_BACKEND_URL}/admin/deleteEmp/${Id}`
    
    axios.post(url)
    .then(()=>console.log('deleted successfully'))
  }
  
  const validName = /[\D]{6,}/
  const emailPattern =/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i
  const phonePattern = /[0-9]{10}/
  const validateName = (Name) => {
    if(!validName.test(Name))
    {
    return setvalidMessage({Name : 'Enter a valid username'})}
    else{
      return setvalidMessage('')
    }
  }
  const validateEmail = (email) => {
    if(!emailPattern.test(email))
    {
    return setvalidMessage('Enter a valid email')}
    else{
      console.log('')
      return setvalidMessage('')
    }
  }
  const validatePhone = (phone) => {
    if(!phonePattern.test(phone))
    {
    return setvalidMessage('Enter a valid phone number')}
    else{
      console.log('')
      return setvalidMessage('')
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
            {validMessage === 'Enter a valid username' && <span className='invalidMsg'>{validMessage}</span>}
          <input type="text" className='editEmpInp' defaultValue={viewData.email} 
          onChange={(e)=>{
            validateEmail(e.target.value)
            setEditemail(e.target.value)}}/>
            {validMessage === 'Enter a valid email' && <span className='invalidMsg'>{validMessage}</span>}
          <input type="text" className='editEmpInp' defaultValue={viewData.phone} 
          onChange={(e)=>{
            validatePhone(e.target.value)
            setEditphone(e.target.value)}}/>
            {validMessage === 'Enter a valid phone number' && <span className='invalidMsg'>{validMessage}</span>}
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