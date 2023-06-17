/* eslint-disable newline-before-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import createConnection from '../../db-init/dbConn'
import User from '../../db-init/models/users'
import { generateRandomUserName } from '../../helpers/generateRandomUserName'

const randomNameGenerator = async (req, res) => {
  try {
    if (req.method == 'POST') {
      const { userName } = req.body

      if (!userName) {
        res.status(400).json({
          error: 'userName are required to process this request.'
        })
      }
      let randomUserNames = []

      const isUserAlreadyExists = await User.findOne({ userName: userName })
      if (!isUserAlreadyExists) {
        randomUserNames.push(userName)
      }

      while (randomUserNames.length != 3) {
        let res = generateRandomUserName(userName)
        const isUserAlreadyExists = await User.findOne({ userName: res })
        if (!isUserAlreadyExists) {
          randomUserNames.push(res)
        }
      }

      res.status(200).json({ success: `UserNames fetched successfully`, data: randomUserNames })
      // return randomUserNames
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

export default createConnection(randomNameGenerator)
