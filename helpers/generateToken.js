import jwt from "jsonwebtoken";
const fs = require("fs");
const path = require("path");

const privateKey = process.env.RSA_PRIVATE_KEY;

export const generateJwtToken = (user) => {
  try {
    console.log(`Generating JWT for user ${JSON.stringify(user)}`);
    //Return a signed token with jwt.sign
    return jwt.sign(user, privateKey, {
      algorithm: "RS256",
      // expiresIn: '15m'
    });
  } catch (error) {
    throw error;
  }
};
