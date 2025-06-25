const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors({
  origin: 'https://sos-jknr.onrender.com',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.options('/send-sos-email', cors());

app.post('/send-sos-email', (req, res) => {
  const { email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'user.nari.help@gmail.com',
      pass: 'czkpemnirrvkqfhh'
    }
  });

  const mailOptions = {
    from: 'user.nari.help@gmail.com',
    to: email,
    subject: subject,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('SOS email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
