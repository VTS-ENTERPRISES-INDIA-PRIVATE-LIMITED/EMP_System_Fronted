import React, { useEffect } from 'react'
import axios from 'axios'


const ViewEmp = () => {
  let dataList = []
  const handleView = async() =>{
    const url = `http://localhost:5000/admin/viewEmp`;
    await axios.post(url)
    .then((res)=>{
      const data =res.data
      for(var i = 0; i< data.length; i++){
        dataList.push(data[i])
    }
  })
  return dataList
  }
  console.log(dataList)

  useEffect(
    handleView, [])

  return (
    <div className="viewCont">
      <table>
        <thead>
          <tr>
          <th>S.No</th>
          <th>Employee ID</th>
          <th>Employee Name</th>
          <th><button>Edit</button></th>
          <th><button>Delete</button></th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((empDet)=>{
            return(<tr key={empDet}>
              <td>{empDet.empId}</td>
            </tr>)
          })
          }
        </tbody>
      </table>
    </div>
  )
}

export default ViewEmp