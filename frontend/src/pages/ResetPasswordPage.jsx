import React from 'react';
import { useParams } from 'react-router-dom';
import ResetPasswordForm from '../components/ResetPassword/ResetPasswordForm';

const ResetPasswordPage = () => {
  const { token } = useParams();

  return (
    <div>
      <ResetPasswordForm token={token} />
    </div>
  );
};

export default ResetPasswordPage;
