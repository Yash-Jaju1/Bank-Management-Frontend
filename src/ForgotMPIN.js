import React, { useState } from 'react';

function ForgotMPIN() {
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: new mpin
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newMpin, setNewMpin] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Step 1: Request OTP
  const requestOtp = async () => {
    setError('');
    setMessage('');
    if (!email) {
      setError('Please enter your email');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/otp/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, reason: 'forgot-mpin' }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('OTP sent to your email.');
        setStep(2);
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch {
      setError('Server error while sending OTP');
    }
  };

  // Step 2: Verify OTP
  const verifyOtp = async () => {
    setError('');
    setMessage('');
    if (otp.length !== 6) {
      setError('Enter a valid 6-digit OTP');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/otp/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        setMessage('OTP verified! Please enter new MPIN.');
        setStep(3);
      } else {
        setError(data.message || 'OTP verification failed');
      }
    } catch {
      setError('Server error during OTP verification');
    }
  };

  // Step 3: Reset MPIN
  const resetMpin = async () => {
    setError('');
    setMessage('');
    if (!/^\d{6}$/.test(newMpin)) {
      setError('MPIN must be exactly 6 digits');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/customers/update-mpin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newMpin }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('MPIN reset successfully! You can now log in.');
        setStep(1);
        setEmail('');
        setOtp('');
        setNewMpin('');
      } else {
        setError(data.message || 'Failed to reset MPIN');
      }
    } catch {
      setError('Server error while resetting MPIN');
    }
  };

  return (
    <div style={{ maxWidth: '350px', margin: '20px auto' }}>
      <h2>Forgot MPIN</h2>
      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <br />
          <button onClick={requestOtp}>Send OTP</button>
        </>
      )}
      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            maxLength={6}
            required
          />
          <br />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
      {step === 3 && (
        <>
          <input
            type="password"
            placeholder="Enter new 6-digit MPIN"
            value={newMpin}
            onChange={e => setNewMpin(e.target.value)}
            maxLength={6}
            required
          />
          <br />
          <button onClick={resetMpin}>Reset MPIN</button>
        </>
      )}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default ForgotMPIN;