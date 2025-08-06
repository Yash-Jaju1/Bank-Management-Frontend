// src/components/ChangeMPIN.js
import React, { useState } from 'react';
import OTPVerification from './OTPVerification';
import { API_BASE } from './apiConfig';

function ChangeMPIN({ email }) {
  const [otpVerified, setOtpVerified] = useState(false);
  const [mpin, setMpin] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const updateMPIN = async () => {
    setError('');
    setMessage('');
    if (mpin.length !== 6 || !/^\d{6}$/.test(mpin)) {
      setError('MPIN must be exactly 6 digits');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/customers/update-mpin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newMpin: mpin }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('MPIN updated successfully!');
        setMpin('');
        setOtpVerified(false);
      } else {
        setError(data.message || 'Failed to update MPIN');
      }
    } catch (err) {
      setError('Server error while updating MPIN');
    }
  };

  return (
    <div>
      {!otpVerified && (
        <OTPVerification email={email} reason="change-mpin" onVerified={() => setOtpVerified(true)} />
      )}
      {otpVerified && (
        <div>
          <input
            type="password"
            placeholder="Enter new 6-digit MPIN"
            value={mpin}
            onChange={(e) => setMpin(e.target.value)}
            maxLength={6}
          />
          <button onClick={updateMPIN}>Update MPIN</button>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
}

export default ChangeMPIN;