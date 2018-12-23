const nodemailer = require('nodemailer');
console.log('fwefwe');
class mail {
    sendInvoice(user) {
        console.log(user);
   nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service:'gmail',
       // secure: false, // true for 465, false for other ports
        auth: {
            user: 'rahulcuber999@gmail.com', // generated ethereal user
            pass: 'rahul1234' // generated ethereal password
        }
    });
    // setup email data with unicode symbols
    let mailOptions = {
        from: 'Hirepbx', // sender address
        to: user.email, // list of receivers
        subject: 'Payment Successfully ', // Subject line
        text: 'Welcome to Hirepbx', // plain text body
        html:'<h1 align="center">Payment Successful </h1> <br><div style="border:1px">Payment has Been Successful <br> Payment Id: '+ 
        user.paymentId+'<br> Payment Amount :'+user.amount+'<br> Payment Type: '+user.type+'</div>'
        // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});
    }
}

module.exports = mail;