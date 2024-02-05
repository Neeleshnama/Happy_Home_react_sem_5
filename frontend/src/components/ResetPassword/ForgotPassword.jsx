import React, { useState } from 'react';
import axios from 'axios';
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
        const response = await axios.post('http://localhost:8000/api/v2/user/forgot-password', { email });
  
        // Handle the response, display a success message, or show an error notification
        setMessage(response.data);
      } catch (error) {
        console.error(error);
        // Handle error, display an error message, or show an error notification
        setMessage('An error occurred while sending the password reset email.');
      }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <button type="submit">Reset Password</button>
      </form>
      <p>{message.success ? 'Success: ' : 'Error: '}{message.message}</p>
    </div>
  );
};

export default ForgotPassword;
