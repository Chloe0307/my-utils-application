// This file using to send emails as notifications on using users account with Send Grid

// NPM imports
const sgMail = require('@sendgrid/mail')

// API key on Send Grid
const sendGridAPIKey = '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'

sgMail.setApiKey(sendGridAPIKey)
sgMail.send({
    to : 'chloecuny@yahoo.fr',
    from : 'chloecuny@yahoo.fr',
    subject: 'This is my first creation',
    text : 'I hope this one actually get to you'
})