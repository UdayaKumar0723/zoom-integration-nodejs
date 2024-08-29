const nodemailer = require("nodemailer");

exports.sendMeetingMail = async (meetingLink, recipientEmail) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MAIL,
    to: recipientEmail,
    subject: "Zoom Meeting integration Link",
    text: `Here is your Zoom meeting link: ${meetingLink}`,
    html: `<p>Here is your Zoom meeting link: <a href="${meetingLink}">${meetingLink}</a></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Error sending mail");
  }
};
