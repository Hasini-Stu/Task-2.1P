console.log("API Key Loaded:", process.env.SENDGRID_API_KEY ? 'Yes' : 'No');

const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

const app = express();
const PORT = 3000;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));


app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  const msg = {
    to: email,
    from: 'nivekzhas@gmail.com',
    subject: 'Welcome to Dev@Deakin!',
    text: 'Thank you for subscribing to the Dev@Deakin platform!',
    html: '<strong>Thanks for subscribing to Dev@Deakin!</strong>',
  };

  try {
    await sgMail.send(msg);
    res.status(200).send('Welcome email sent successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to send email.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



