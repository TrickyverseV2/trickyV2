import User from '../../db-init/models/users'
import Log from '../../db-init/models/logs'
import createConnection from '../../db-init/dbConn'
import { generateJwtToken } from '../../helpers/generateToken'
import { generateRandomUserName } from '../../helpers/generateRandomUserName'
import bcrypt from 'bcryptjs'

const addUser = async (res, requestBody, isUserNew) => {
  const { userName, firstName, lastName, email, mobileNumber, password } = requestBody
  const salt = await bcrypt.genSalt(10)
  // Hash password
  let encryptedPassword = await bcrypt.hash(password, salt)
  let generatedUserName = userName
  while (true) {
    generatedUserName = generateRandomUserName(firstName)
    const isUserAlreadyExists = await User.findOne({ userName: generatedUserName })
    if (!isUserAlreadyExists) {
      break
    }
  }

  let newUser = new User({
    ...requestBody,
    userName: generatedUserName,
    password: encryptedPassword,
    isProfileComplete: true,
    createdOn: Date.now(),
    updatedOn: Date.now()
  })

  let savedUser

  if (isUserNew) {
    savedUser = await newUser.save()
  } else {
    savedUser = await User.findOneAndUpdate(
      { mobileNumber: mobileNumber },
      {
        ...requestBody,
        userName: generatedUserName,
        isProfileComplete: true,
        password: encryptedPassword,
        updatedOn: Date.now()
      }
    )
  }

  const token = generateJwtToken({
    userName: generatedUserName,
    email
  })

  if (!token) {
    res.status(400).json({
      success: false,
      error: `User created successfully with userName as ${generatedUserName}, but token generation failed`
    })
  }

  let userLog = await Log({
    userAgent: 'Profile created'
  })

  const savedLog = await userLog.save()

  await User.findOneAndUpdate(
    { userName: generatedUserName },
    {
      logs: [...savedUser?.logs, savedLog?._id]
    }
  )

  res.status(200).json({ success: `User created successfully with userName as ${generatedUserName}`, token: token })
}

const signUp = async (req, res) => {
  try {
    if (req.method == 'POST') {
      const { userName, firstName, email, mobileNumber, password } = req.body

      if (!firstName || !password || (!mobileNumber && !email)) {
        res.status(400).json({
          error: 'firstName, mobileNumber and email or password fields are required to process this request.'
        })
      }
      if (userName) {
        const isUserAlreadyExists = await User.findOne({ userName: userName })
        if (isUserAlreadyExists && isUserAlreadyExists?._id) {
          res.status(400).json({ success: `User with userName as ${userName} already exists` })
        }
      }
      if (email) {
        const isUserAlreadyExists = await User.findOne({ email: email })
        if (isUserAlreadyExists && isUserAlreadyExists?._id) {
          res.status(400).json({ success: `User with email as ${email} already exists` })
        }
      }
      if (mobileNumber) {
        const isUserAlreadyExists = await User.findOne({ mobileNumber: mobileNumber })
        if (isUserAlreadyExists && isUserAlreadyExists?.isProfileComplete) {
          res.status(400).json({ success: `User with mobileNumber as ${mobileNumber} already exists` })
        } else if (!isUserAlreadyExists?.isProfileComplete) {
          addUser(res, req.body, false)
        }
      }

      addUser(res, req.body, true)
    } else {
      res.status(400).json({
        error: 'This method is not allowed'
      })
    }
  } catch (err) {
    return res.status(400).json({
      error: `${JSON.stringify(err)}\n${err}`
    })
  }
}

export default createConnection(signUp)
