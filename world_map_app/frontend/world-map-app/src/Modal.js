import React from 'react';
import './App.css';

const Modal = ({ children, show, handleClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close" onClick={handleClose}>Close</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
