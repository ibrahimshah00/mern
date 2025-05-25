import React, { useState } from 'react';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the WhatsApp message
    const message = `Hello, my email is ${email}. Here is my message: ${description}`;
    const whatsappUrl = `https://wa.me/923345310281?text=${encodeURIComponent(message)}`;

    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>

      <div className="contact-info">
        <p><strong>Email:</strong> ibrahimibnanwar001@gmail.com</p>
        <p><strong>Phone:</strong> +923345310281</p>
      </div>

      <div className="contact-form">
        <h2>Send Us a Message</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Your Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Message:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit">Send via WhatsApp</button>
        </form>
      </div>
    </div>
  );
}
