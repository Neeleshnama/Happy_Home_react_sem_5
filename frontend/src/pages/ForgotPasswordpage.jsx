import React from 'react';
import { useParams } from 'react-router-dom';
import ForgotPassword from '../components/ResetPassword/ForgotPassword';

const ForgotPasswordpage = () => {
  const { token } = useParams();

  return (
    <div>
      <ForgotPassword/>
    </div>
  );
};

export default ForgotPasswordpage;
