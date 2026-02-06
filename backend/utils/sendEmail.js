const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (to, subject, html) => {

  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
      user: "apikey",
      pass: process.env.SENDGRID_API_KEY,
    },
  });

  const mailOptions = {
    from: `Shopfinity <${process.env.EMAIL}>`,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
  console.log("OTP sent to", to);
});

module.exports = sendEmail;
