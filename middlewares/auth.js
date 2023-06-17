import { verify } from 'jsonwebtoken'
const fs = require('fs')
const path = require('path')

const publicKey = process.env.RSA_PUBLIC_KEY

function authToken(req, res) {
  const bearerHeader = req.headers['authorization']
  if (!bearerHeader) return res.status(401).send('Access Denied. No token provided.')
  const bearer = bearerHeader.split(' ')
  const token = bearer[1]
  if (!token) return res.status(401).send('Access Denied. No token provided.')

  try {
    // instead of jwt.sign, using jwt.verify to verify if it is a valid token
    const decoded = verify(token, publicKey, { algorithm: 'RS256' })
    // returns the value of the jwt if the token is verified
    req.user = decoded
    return true
  } catch (err) {
    return res.status(400).send(`${err ?? 'Invalid token'}`)
  }
}
export default authToken
