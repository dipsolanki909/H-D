const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  let transporter;

  if (process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    // Local fallback: print email content to server console.
    transporter = nodemailer.createTransport({ streamTransport: true, newline: 'unix', buffer: true });
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM || 'Your App <yourapp@example.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const info = await transporter.sendMail(mailOptions);

  // Always log email in dev mode
  if (!process.env.SMTP_HOST) {
    console.log('\n========== EMAIL PREVIEW (DEV MODE) ==========');
    console.log(`To: ${mailOptions.to}`);
    console.log(`Subject: ${mailOptions.subject}`);
    console.log(`\n${mailOptions.text}`);
    console.log('=============================================\n');
  }
};

module.exports = sendEmail;
