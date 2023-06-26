const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware.js');
const multer = require('multer');
const  { createdestination, deletedestination, getAlldestinations, getdestinationByid, updatedestination } = require('../controllers/destinationcontroller.js')


const storage=multer.diskStorage({
  destination:"./uploads/destinations",
  filename:(req,file,cb)=>{
    cb(null,`${Date.now()}-${file.originalname}`)
  }
})
const upload=multer({
  storage:storage
})


router.route('/').post(protect,admin,upload.single("destinationImage"),createdestination).get(getAlldestinations)
router.route('/updatedestination').post(protect,admin,upload.single("destinationImage"),updatedestination)
router.route('/getsingledestination').post(protect,admin,getdestinationByid)
router.route('/deletedestination').post(protect,admin,deletedestination)

module.exports=router

