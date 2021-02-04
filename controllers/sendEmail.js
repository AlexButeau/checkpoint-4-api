require("dotenv").config();
const nodemailer = require("nodemailer");

module.exports.handleSendEmail = async (req, res) => {
  const {
    currentUser_email,
    currentUser_firstname,
    currentUser_lastname,
    contactedUser_email,
    contactedUser_firstname,
    contactedUser_lastname,
    ride_start_city,
    ride_arrival_city,
    ride_start_date,
    message,
  } = req.body;

  // sending an email with user infos
  const transport = {
    host: "smtp.gmail.com", // e.g. smtp.gmail.com
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  };

  const transporter = nodemailer.createTransport(transport);

  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log(success);
      console.log("All works fine, congrats!");
    }
  });

  const mail = {
    from: `"Remora" <${process.env.EMAIL_USER}>`,
    to: contactedUser_email,
    subject: `Vous avez un message de ${currentUser_firstname} ${currentUser_lastname}`,

    html: `<h3>Bonjour ${contactedUser_firstname} ${contactedUser_lastname}</h3><p>${currentUser_firstname} ${currentUser_lastname} est intéressé.e par votre trajet du ${
      ride_start_date.split("T")[0]
    } de ${ride_start_city} à ${ride_arrival_city}.
    <br/>Son message : "${message}"
    <br/> Contactez la/le via ${currentUser_email} pour convenir des détails !</>`,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log("fail sending user creation email");
    } else {
      console.log("success sending user creation email");
      console.log(data);
    }
  });

  return res.sendStatus(201);
};
