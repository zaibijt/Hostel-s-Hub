import transporter from "./emailTransporter.js";

const sendVerificationEmail = async (email, verificationLink,otp) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Verify Your Email Address",
      html: otp ? `<p>Your OTP ${verificationLink} </p>` : `<p>Please verify your email address by clicking the following link:</p><p><a href="${verificationLink}">Verify Email</a></p>`,
    });
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

export default sendVerificationEmail;
