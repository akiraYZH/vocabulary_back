//Mail configs
const email = {
  service: "QQ",
  user: "664753092@qq.com",
  pass: "stiivzrfxltwbgaj",
};

/**
 *
 * @Description Send mail
 * Call:sendMail('amor_zhang@qq.com','This is a test mail', 'Hi Amor, this is a test mail');
 * @Author Amor
 * @Created 2016/04/26 15:10
 * 
 *
 */

var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

smtpTransport = nodemailer.createTransport(
  smtpTransport({
    service: email.service,
    auth: {
      user: email.user,
      pass: email.pass,
    },
  })
);

/**
 * @param {String} recipient Recepient
 * @param {String} subject Theme
 * @param {String} html html content
 */
var sendMail = function (recipient, subject, html) {
  smtpTransport.sendMail(
    {
      from: email.user,
      to: recipient,
      subject: subject,
      html: html,
    },
    function (error, response) {
      if (error) {
        console.log(error);
      }
      console.log("Successfully sent.");
    }
  );
};

module.exports = sendMail;
