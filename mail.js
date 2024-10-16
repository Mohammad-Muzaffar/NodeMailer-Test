const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

const mailOptions = {
    from: {
        name: "Muzaffar Shaikh",
        address: process.env.SMTP_USER
    },
    to: ["yourmail@gmail.com"],
    subject: "Test Email",
    text: "I am testing this email using nodemailer.",
    html: "<h3>HI HTML</h3>",
    cc: ["yourccmail@gmail.com"],
    attachments: [
        {
            filename: "Profile Image",
            path: path.join(__dirname, "pf.jpg"),
            contentType: "image/jpg"
        },
        {
            filename: "Products Management",
            path: path.join(__dirname, "Products Management.pdf"),
            contentType: "application/pdf"
        }
    ]
}

const sendMail = async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent Successfully!");
    } catch (error) {
        console.error(error)
    }
}

sendMail(transporter, mailOptions);
