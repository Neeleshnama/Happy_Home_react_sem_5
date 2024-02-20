import React, { useState } from 'react';
import axios from 'axios';
import './forgotpwd.css'
import { toast } from "react-toastify";
import { server } from "../../server";
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add your password reset logic here, for now, let's just show a message
    try {
        // Make API call to send the password reset email
        const response = await axios.post(`${server}/user/forgot-password`, { email });
  
        // Handle the response, display a success message, or show an error notification
        toast.success(response.data);
        setMessage(response.data);
      } catch (error) {
        console.error(error);
        toast.error(error);
        // Handle error, display an error message, or show an error notification
        setMessage('An error occurred while sending the password reset email.');
      }
  };

  return (
    <div className='fpwd'>
      {/* hi
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <button type="submit">Reset Password</button>
      </form>
      <p>{message.success ? 'Success: ' : ' '}{message.message}</p>  */}

<div class='bg-image'></div>
<div class="container ">

  <div class="brand-title">Reset Your Password?<br/></div>
  <form onSubmit={handleSubmit}>
  <div class="inputs">
    <label>EMAIL <br />(Please enter your registered mail only)</label>
    <input type="email" value={email} onChange={handleEmailChange} placeholder="example@test.com" />
    <p style={{color:'red'}}>{message.success ? 'Success: ' : ' '}{message.message}</p>
    
    <button type="submit">RESET</button>
  </div>
  </form>
  
</div>
    </div>
  );
};

export default ForgotPassword;
