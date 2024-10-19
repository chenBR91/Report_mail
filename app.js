require('dotenv').config()
const express = require('express')
const path = require('path')
const http = require('http')
const url = require('url')
const nodemailer = require('nodemailer')


const app = express()
const PORT = process.env.PORT || 3000

app.set("port", PORT);
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static("page"));


//Routing
app.get('/', (req, res) => {
    res.send('test');
    //res.sendFile(path.join(__dirname, "page/index.html"))
})

app.post("/send_email", async (req, res) => {
    const email_user = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    // if(subject.length === 0) {
    //     console.log(subject, " empty")
    // }else {
    //     console.log(subject, " not empty")
    // }

    const transporter = nodemailer.createTransport({
        service: 'gamil',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: subject,
        text: message
    }

    await transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
            res.send(500);
        }
        else {
            console.log("**** Email send! ****")
        }
        res.redirect("/")
    })
})

// initalize web server
app.listen(PORT, ()=> {
    console.log(`Example app listening on port ${PORT}`)
})