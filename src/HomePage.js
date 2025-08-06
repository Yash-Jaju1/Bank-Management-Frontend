import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import './HomePage.css';

// Example logo — replace with your real logo if available
const bankLogoUrl = 'https://img.icons8.com/ios-filled/100/228be6/bank.png';

export default function HomePage() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`home-page-container ${theme}`}>
      <header className="home-header">
        <img src={bankLogoUrl} alt="Bank Logo" className="bank-logo" />
        <h1>Welcome to Your Trusted Bank</h1>
        <p>Your secure and simple financial partner</p>
      </header>

      <section className="home-actions">
        <button onClick={() => navigate('/login')} className="btn login-btn">
          Customer Login
        </button>
        <button onClick={() => navigate('/register')} className="btn register-btn">
          Customer Register
        </button>
      </section>

      <section className="home-features">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>24/7 Secure Access</h3>
            <p>Manage your account anytime, anywhere with our secure platform.</p>
          </div>
          <div className="feature-card">
            <h3>Fast Transactions</h3>
            <p>Experience instant money transfers, deposits, and withdrawals.</p>
          </div>
          <div className="feature-card">
            <h3>Personalized Support</h3>
            <p>Our dedicated support team is here to assist you around the clock.</p>
          </div>
          <div className="feature-card">
            <h3>Innovative Mobile App</h3>
            <p>Bank on the go with our user-friendly mobile application.</p>
          </div>
        </div>
      </section>

      <section className="home-testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial">
          <p>
            "I love how easy it is to manage my finances! Fast, secure, and always responsive support!"<br />
            <span>- Priya S., Mumbai</span>
          </p>
        </div>
        <div className="testimonial">
          <p>
            "The mobile app is brilliant—transfers are instant and I never worry about waiting in line."<br />
            <span>- Amit J., Pune</span>
          </p>
        </div>
      </section>

      <section className="home-faqs">
        <h2>Frequently Asked Questions</h2>
        <div className="faq">
          <b>How do I open a new account?</b>
          <div>Simply click 'Register' and complete the easy signup form.</div>
        </div>
        <div className="faq">
          <b>Is online access secure?</b>
          <div>Yes. We use industry-leading SSL encryption and secure authentication.</div>
        </div>
        <div className="faq">
          <b>Where can I get customer support?</b>
          <div>You can call, email, or chat with us 24/7 via the online support portal.</div>
        </div>
      </section>

      <footer className="home-footer">
        <p>Contact us: support@yourbank.com | +1 234 567 8900</p>
        <p>&copy; {new Date().getFullYear()} Your Trusted Bank. All rights reserved.</p>
      </footer>
    </div>
  );
}
