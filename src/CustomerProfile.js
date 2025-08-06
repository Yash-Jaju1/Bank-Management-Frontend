import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import ChangeMPIN from './ChangeMPIN';               // OTP-integrated MPIN change
import ChangeSecurityQuestion from './ChangeSecurityQuestion'; // OTP-integrated security question change
import { API_BASE } from './apiConfig';

function CustomerProfile() {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', mobileNo: '' });
  const [profileMsg, setProfileMsg] = useState('');

  // Fetch profile on mount
  useEffect(() => {
    if (!user?.customerId) return;
    fetch(`${API_BASE}/customers/${user.customerId}`)
      .then(res => res.json())
      .then(data => setForm({
        name: data.name || '',
        email: data.email || '',
        mobileNo: data.mobileNo || ''
      }))
      .catch(() => setProfileMsg('Failed to load profile.'));
  }, [user]);

  // Handle profile input changes
  const handleProfileChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit profile update
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileMsg('');
    try {
      const res = await fetch(`${API_BASE}/customers/profile/${user.customerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setProfileMsg('Profile updated successfully!');
        setForm({ name: data.name, email: data.email, mobileNo: data.mobileNo });
      } else {
        setProfileMsg(data.message || data.error || 'Profile update failed.');
      }
    } catch {
      setProfileMsg('Server error');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto' }}>
      <h2>Profile Settings</h2>

      <form onSubmit={handleProfileSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleProfileChange}
          required
        /><br />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleProfileChange}
          required
          readOnly
        /><br />
        <input
          name="mobileNo"
          type="tel"
          placeholder="Mobile Number"
          value={form.mobileNo}
          onChange={handleProfileChange}
        /><br />
        <button type="submit" style={{ marginTop: 10 }}>Update Profile</button>
      </form>
      <p style={{ color: profileMsg.includes('success') ? 'green' : 'red' }}>{profileMsg}</p>

      <hr />

      {/* OTP-verified MPIN change */}
      {form.email && (
        <>
          <h3>Change MPIN (with OTP verification)</h3>
          <ChangeMPIN email={form.email} />
        </>
      )}

      <hr />

      {/* OTP-verified Security Question change */}
      {form.email && (
        <>
          <h3>Change Security Question (with OTP verification)</h3>
          <ChangeSecurityQuestion email={form.email} />
        </>
      )}
    </div>
  );
}

export default CustomerProfile;
