require('dotenv').config();
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const path = require('path')

const port = process.env.PORT || 5000;

app.use(express.static('public'));
// app.use(express.static(__dirname + '/public'));
// app.use('/static', express.static('/public'))
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res)=>{
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port:465,
        secure:true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'charanweb.info@gmail.com',
        subject: `Message from ${req.body.email}:  ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('Email sent: ' + info.response);
            res.send('success');
        }
    })

})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})