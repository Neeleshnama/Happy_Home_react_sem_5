// import React, { useState } from 'react';
// import axios from 'axios';
// import './forgotpwd.css';

// const ResetPasswordForm = ({ token }) => {
//   const [newPassword, setNewPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Make API call to update the password
//       const response = await axios.post(`http://localhost:8000/api/v2/user/reset-password/${token}`, {
//         newPassword,
//       });

//       // Handle the response, display a success message, or navigate to a success page
//       setMessage(response.data);
//     } catch (error) {
//       console.error(error);
//       // Handle error, display an error message, or show an error notification
//       setMessage('An error occurred while resetting the password.');
//     }
//   };

//   return (
//     <div>
//       {/* <h2>Reset Password</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           New Password:
//           <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
//         </label>
//         <button type="submit">Submit</button>
//       </form>
//       <p>{message}</p> */}

// <div className='fpwd'>
//       {/* hi
//       <h2>Forgot Password</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Email:
//           <input type="email" value={email} onChange={handleEmailChange} />
//         </label>
//         <button type="submit">Reset Password</button>
//       </form>
//       <p>{message.success ? 'Success: ' : ' '}{message.message}</p>  */}

// <div className="bg-image">hi</div>
// <div class="container ">
//   <div class="brand-logo"></div>
//   <div class="brand-title">Happy Home</div>
//   <form onSubmit={handleSubmit}>
//   <div class="inputs">
//     <label>Create Password</label>
//     <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
//     <label>Confirm Password</label>
//     <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
//     <p style={{color:'red'}}>{message.success ? 'Success: ' : ' '}{message.message}</p>
    
//     <button type="submit">Create</button>
//   </div>
//   </form>
  
// </div>
//     </div>
//     </div>
//   );
// };

// export default ResetPasswordForm;
import React, { useState } from 'react';
import axios from 'axios';
import './forgotpwd.css';

const ResetPasswordForm = ({ token }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

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
      <div className='fpwd'>
        <div className="bg-image">hi</div>
        <div class="container ">
          <div class="brand-logo"></div>
          <div class="brand-title">Happy Home</div>
          <form onSubmit={handleSubmit}>
            <div class="inputs">
              <label>Create Password</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              <label>Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <p style={{ color: 'red' }}>{message}</p>
              <button type="submit">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
