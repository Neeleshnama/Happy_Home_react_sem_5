import React, { useState } from 'react';
import axios from 'axios';


const ResetPasswordForm = ({ token }) => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API call to update the password
      const response = await axios.post(`http://localhost:8000/api/v2/user/reset-password/${token}`, {
        newPassword,
      });

      // Handle the response, display a success message, or navigate to a success page
      setMessage(response.data);
    } catch (error) {
      console.error(error);
      // Handle error, display an error message, or show an error notification
      setMessage('An error occurred while resetting the password.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ResetPasswordForm;
