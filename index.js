const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');


const app = express();
app.use(cors({
    origin: '*', // Adjust this as needed
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
  }));
  
const port = 3000;

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


