const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (to, subject, html) => {
  if (!to || !subject || !html) {
    throw new Error("Missing required email fields");
  }
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
  });

  const mailOptions = {
    from: `"Shopfinity 👕" <${process.env.EMAIL}>`,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
  console.log(" Email sent successfully to", to);
});

module.exports = sendEmail;
