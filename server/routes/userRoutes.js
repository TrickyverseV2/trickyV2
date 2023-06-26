const express = require('express');
const router = express.Router();
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  logout,
  verifyEmail,
  forgetPassword,
  resetPassword,
  updateProfileImage,
  updateUserPassword
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');
const multer = require('multer');

const storage=multer.diskStorage({
  destination:"./uploads/users",
  filename:(req,file,cb)=>{
    cb(null,`${Date.now()}-${file.originalname}`)
  }
})
const upload=multer({
  storage:storage
})


router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.post('/logout', protect,logout)
router.post('/verify',verifyEmail)
router.post('/forgetpassword',forgetPassword)
router.post('/resetpassword',resetPassword)
router.post('/updatepassword', protect,updateUserPassword)
router.post('/updateprofileimage', protect,upload.single("profileImage"),updateProfileImage)


router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

  module.exports=router

