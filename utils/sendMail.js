const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { API_KEY_SENDGRID } = process.env;

sgMail.setApiKey(API_KEY_SENDGRID);

const sendMail = async data => {
  try {
    const mail = { ...data, from: 'nina.motorna@gmail.com' };
    await sgMail.send(mail);
    return true;
  } catch (error) {}
};

module.exports = sendMail;
