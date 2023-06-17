import createConnection from '../../db-init/dbConn'
import authToken from 'src/middlewares/auth'
const nodemailer = require('nodemailer')

const userEmail = process.env.USER_EMAIL
const userPassword = process.env.USER_PASSWORD

const sendEmail = async (req, res) => {
  try {
    if (req.method == 'POST') {
      if (authToken(req, res)) {
        const { email } = req.user

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: userEmail,
            pass: userPassword
          }
        })

        const mailOptions = {
          from: userEmail,
          to: email,
          subject: 'Link To Reset Password',
          text:
            'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            `http://localhost:3031/reset\n\n` +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        }

        transporter.sendMail(mailOptions, err => {
          if (err) {
            res.status(400).json({
              error: `There was an error sending the email. Error: ${err}`
            })
          } else {
            res.status(200).json({ success: 'Recovery email sent to reset the password' })
          }
        })
      } else {
        res.status(400).json({
          error: 'This method is not allowed'
        })
      }
    }
  } catch (err) {
    return res.status(400).json({
      error: `${JSON.stringify(err)}\n${err}`
    })
  }
}

export default createConnection(sendEmail)
