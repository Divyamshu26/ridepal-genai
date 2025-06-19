import React from 'react';
import '../styles/Contact.css'; // Custom CSS for styling

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>Have a question or feedback? We'd love to hear from you!</p>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" rows="5" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
