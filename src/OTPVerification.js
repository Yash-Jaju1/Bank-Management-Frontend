// src/components/OTPVerification.js
import React, { useState } from 'react';
import { API_BASE } from './apiConfig';

function OTPVerification({ email, reason, onVerified }) {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Send OTP
  const sendOtp = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch(`${API_BASE}/otp/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, reason }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setOtpSent(true);
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Server error while sending OTP');
    }
    setLoading(false);
  };

  // Verify OTP
  const verifyOtp = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch(`${API_BASE}/otp/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        setMessage('OTP verified, you can now proceed');
        onVerified();
      } else {
        setError(data.message || 'Invalid or expired OTP');
      }
    } catch (err) {
      setError('Server error while verifying OTP');
    }
    setLoading(false);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      {!otpSent ? (
        <button onClick={sendOtp} disabled={loading}>
          {loading ? 'Sending OTP...' : 'Send OTP'}
        </button>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
          />
          <button onClick={verifyOtp} disabled={loading || otp.length !== 6}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
}

export default OTPVerification;