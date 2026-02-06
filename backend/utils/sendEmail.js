const sgMail = require("@sendgrid/mail");
const asyncHandler = require("express-async-handler");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = asyncHandler(async (to, subject, html) => {

  const msg = {
    to,
    from: process.env.EMAIL, // verified sender
    subject,
    html,
  };

  await sgMail.send(msg);
  console.log("OTP sent to", to);
});

module.exports = sendEmail;
