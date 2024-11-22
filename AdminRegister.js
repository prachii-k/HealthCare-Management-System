// AdminRegister.js

import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminRegister } from '../../services/AdminService';

const AdminRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()
  

 
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
};


  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any actions like sending the data to the server
    const admin={email:email,password:password}
    adminRegister(admin)
    .then((res)=>{console.log(res.data)
    navigate('/')
    })
   
  };

  return (
    <div className="registration-form">
      <form onSubmit={handleSubmit}>
      <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={handleEmailChange}
                    className='text-field'
                />
        <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    className='text-field'
                    fullWidth
                    value={password}
                    onChange={handlePasswordChange}
                />
        <Button variant="contained" className='login-button' color="primary" type="submit">Register</Button>
      </form>
    </div>
  );
};

export default AdminRegister;
