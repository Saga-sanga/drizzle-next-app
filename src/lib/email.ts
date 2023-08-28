import nodemailer from "nodemailer";
import type { TransportOptions } from "nodemailer";
import { createToken } from "./jwt";
// const nodemailer = require("nodemailer");

interface sendEmailData {
  to: string;
  replyTo?: string;
  subject: string;
  text?: string;
  html: string;
}

export const sendEmail = async (emailData: sendEmailData) => {
  let transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE_ENABLED === "1", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  } as TransportOptions);
  const emailDefaults = {
    from: `TODO App <${process.env.MAIL_FROM || "noreply@email.com"}>`,
  };

  await transport.sendMail({ ...emailDefaults, ...emailData });
};

export const sendVerificationMail = async (user: {
  id: string;
  email: string;
}) => {
  const token = createToken(user.id, user.email, {
    expiresIn: "1d",
  });
  const verifyLink = `${
    process.env.WEBAPP_URL
  }/auth/verify?token=${encodeURIComponent(token)}`;
  const verificationRequestLink = `${
    process.env.WEBAPP_URL
  }/auth/verification-requested?email=${encodeURIComponent(user.email)}`;
  await sendEmail({
    to: user.email,
    subject: "Welcome to TODO App 🤍",
    html: `<h1>Welcome!</h1>
    To start using TODO App please verify your email by clicking the button below:<br/><br/>
    <a class="button" href="${verifyLink}">Confirm email</a><br/>
    <br/>
    <strong>The link is valid for 24h.</strong><br/><br/>If it has expired please request a new token here:
    <a href="${verificationRequestLink}">Request new verification</a><br/>
    <br/>
    Your Formbricks Team`,
  });
};
