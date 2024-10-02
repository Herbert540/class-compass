import React from 'react';

const StatusMessage = ({ message }) => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <p className="fs-3 text-muted">{message}</p>
    </div>
  );
};

export default StatusMessage;
