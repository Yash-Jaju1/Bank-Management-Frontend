// src/components/ChangeSecurityQuestion.js
import React, { useState } from 'react';
import OTPVerification from './OTPVerification';

function ChangeSecurityQuestion({ email }) {
  const [otpVerified, setOtpVerified] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const updateSecurityQuestion = async () => {
    setError('');
    setMessage('');
    if (!question || !answer) {
      setError('Please enter both question and answer');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/customers/update-security-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, question, answer }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Security question updated successfully!');
        setQuestion('');
        setAnswer('');
        setOtpVerified(false);
      } else {
        setError(data.message || 'Failed to update security question');
      }
    } catch (err) {
      setError('Server error while updating security question');
    }
  };

  return (
    <div>
      {!otpVerified && (
        <OTPVerification email={email} reason="change-security-question" onVerified={() => setOtpVerified(true)} />
      )}
      {otpVerified && (
        <div>
          <input
            type="text"
            placeholder="Enter new security question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button onClick={updateSecurityQuestion}>Update Security Question</button>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
}

export default ChangeSecurityQuestion;