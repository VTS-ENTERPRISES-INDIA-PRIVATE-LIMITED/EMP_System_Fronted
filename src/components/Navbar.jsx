import React from 'react'

const Navbar = () => {
  return (
    <div className='navBar'>
        <img src={process.env.PUBLIC_URL + 'assets/images/logo.png'} alt="" className="logo" /> VTS
    </div>
  )
}

export default Navbar