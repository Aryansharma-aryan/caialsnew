// testMail.js
const nodemailer = require('nodemailer');
require('dotenv').config();

(async () => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"CAIALS Test" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_RECIPIENT,
      subject: 'Test Email from CAIALS Server',
      text: 'If you received this, your email setup works ✅',
    });

    console.log('✅ Test email sent:', info.response);
  } catch (err) {
    console.error('❌ Email failed:', err);
  }
})();
