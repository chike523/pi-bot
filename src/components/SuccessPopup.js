'use client';

import React from 'react';

const SuccessPopup = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Payment Status</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="success-message">
            <span className="success-icon">✓</span>
            <p>Response: Payment booked successfully</p>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="modal-button modal-primary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;