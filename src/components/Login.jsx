import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ id: '', password: '' });
  const navigate = useNavigate()
  const validate = () => {
    let valid = true;
    const newErrors = { id: '', password: '' };

    if (!id) {
      newErrors.id = 'ID is required';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Submit form or perform login logic here
      console.log('Form submitted with:', { id, password });
      navigate("/dashboard")
    }
  };

  return (
    <>
      <div className='Payslip-SignUp'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className='credentials'>
          <div>
            <input 
              type="text" 
              placeholder='ID' 
              value={id}
              onChange={(e) => setId(e.target.value)} 
            />
            {errors.id && <p style={{ color: 'red', margin: '0px 0px 0px 10px' }}>{errors.id}</p>}
          </div>
          <div>
            <input 
              type="password" 
              placeholder='Password' 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
            {errors.password && <p style={{ color: 'red', margin: '0px 0px 0px 10px' }}>{errors.password}</p>}
            <a href="reset-password"><p style={{marginLeft:"10px "}}>Forgot Password?</p></a>

          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};  

export default Login;