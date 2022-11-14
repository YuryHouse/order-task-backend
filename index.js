const express = require('express');
const nodemailer = require("nodemailer");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let smtp_login = process.env.SMTP_LOGIN || "---";
let smtp_password = process.env.SMTP_PASSWORD || "---";


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_password, // generated ethereal password dehgyeuqbzyjorav
    }
});

app.get('/', function (req, res) {
    res.send('Hello');
});

app.post('/sendMessage', async function (req, res) {
// send mail with defined transport object
    let phone = req.body.data.phone;

    console.log(phone)

    let info = await transporter.sendMail({
        from: "Order", // sender address
        to: "yurasz@yandex.by", // list of receivers
        subject: "Order form message", // Subject line
        html:
            `<b>The message from order contact form: </b>
            <div>Contact phone number: ${phone}</div>`, // html body
    });
    res.send('Hey');
});

let port = process.env.PORT || 3010;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});