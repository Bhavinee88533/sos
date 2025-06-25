const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');


const app = express();
const port = 3000;

const path = require('path');

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html on root
app.get('/send-sos-email', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.use(cors({
  origin: 'https://sos-jknr.onrender.com/send-sos-email',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));
  
// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle SOS email sending
app.post('/send-sos-email', (req, res) => {
    const { email, subject, message } = req.body;

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'user.nari.help@gmail.com',
            pass: 'czkpemnirrvkqfhh'
        }
    });

    // Configure the email options
    const mailOptions = {
        from: 'user.nari.help@gmail.com',
        to: email,
        subject: subject,
        text: message
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('SOS email sent successfully');
        }
    });
});


