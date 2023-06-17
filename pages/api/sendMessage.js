/* eslint-disable lines-around-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import twilio from 'twilio'

const handler = async (req, res) => {
  if (req.method == 'POST') {
    sendMessage()
  }
}
export default function sendMessage(req, res) {
  const accountSid = 'AC7196dd0f8675d7e4bc26b10482550b64'
  const token = '55bf6ee00667c0be7f27ff0c1ba5d27e'
  const client = twilio(accountSid, token)
  const { phone, message } = req.body
  // console.log(phone, message);
  client.messages
    .create({
      body: 'Hi from trickyTravellers ',
      to: '+917559297258',
      from: '+918168292534'
      // to: req.body.phone
    })
    .then(message =>
      res.json({
        success: true
      })
    )
    .catch(error => {
      console.log(error)
      res.json({
        success: false
      })
    })
}
