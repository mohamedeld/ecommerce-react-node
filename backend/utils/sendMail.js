const nodemailer = require("nodemailer");
const sendMail = async (props) => {
  const transporter = nodemailer.createTransport({
    service: "Mail.ru",
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASSWORD,
    },
  });
  console.log(process.env)
  const mailOptions = {
    from: {
      name: "Shop Support",
      address: process.env.MAILER_EMAIL,
    },
    to: props.email,
    subject: props.subject,
    text: props.message,
  };

  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    } else {
      return false;
    }
  });
};
// const sendMail = async (options) => {
//     const transporter = nodemailer.createTransport({
//         host: process.env.SMPT_HOST,
//         port: process.env.SMPT_PORT,
//         service: process.env.SMPT_SERVICE,
//         auth:{
//             user: process.env.SMPT_MAIL,
//             pass: process.env.SMPT_PASSWORD,
//         },
//     });

//     const mailOptions = {
//         from: process.env.SMPT_MAIL,
//         to: options.email,
//         subject: options.subject,
//         text: options.message,
//     };

//     await transporter.sendMail(mailOptions);
// };

module.exports = sendMail;
