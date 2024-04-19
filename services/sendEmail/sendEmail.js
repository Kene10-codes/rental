const nodemailer = require('nodemailer')
const path = require('path')
const logger = require('../log/log')()

module.exports = function (user, subject, text, moreInfo) {
    const { email } = user
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    })

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        text: text,
        html: moreInfo,
        attachments: [
            {
                filename: 'thank.png',
                path: `${path.join(
                    __dirname,
                    '..',
                    '..',
                    'public',
                    'thank.png'
                )}`,
            },
        ],
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            logger.error(error.message)
        } else {
            logger.info('Email sent: ' + info.response)
        }
    })
}
