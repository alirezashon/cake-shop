import React from 'react';

const ErrorPage: React.FC<{ errorMessage: string }> = ({ errorMessage }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>خطا</h1>
      <p>متأسفیم، یک خطای ناشناخته رخ داده است</p>
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorPage;