const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // Load environment variables

const app = express();
app.use(cors());  // Enable CORS
app.use(bodyParser.json());  // Parse incoming JSON requests

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define Schema for Email collection
const emailSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

// Create Model for Email collection
const Email = mongoose.model('Email', emailSchema);

// SendGrid API Key from .env file
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Save the email data to MongoDB
  const newEmail = new Email({
    name,
    email,
    message,
  });

  try {
    // Save to the database
    await newEmail.save();
    console.log('Email saved to database');

    // Send email using SendGrid
    const msg = {
      to: 'eypamintuan.work@gmail.com', // Your email address
      from: email, // Sender's email address
      subject: 'Zephrotech Contact Form',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send the email via SendGrid
    await sgMail.send(msg);

    res.status(200).send({ success: true, message: 'Email sent and saved to database' });
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    res.status(500).send({ success: false, error: error.message });
  }
});

// Start server
app.listen(3000, () => console.log('Server started on port 3000'));
