import React, { useEffect } from 'react'
import axios from 'axios'

const ViewEmp = () => {
  const handleView = () =>{
    const url = `http://localhost:5000/admin/ViewEmp`;
    axios.post(url)
    .then((res)=>{
      console.log(res.data)
    })
  }
  return (
    <div className="viewCont">
        
    </div>
  )
}

export default ViewEmp