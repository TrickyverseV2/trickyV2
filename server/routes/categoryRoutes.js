const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware.js');
const {createCategory,deleteCategory,getAllCategories,updateCategory, getCategoryByid} = require("../controllers/categorycontrollers.js");
const multer = require('multer');


const storage=multer.diskStorage({
  destination:"./uploads/categories",
  filename:(req,file,cb)=>{
    cb(null,`${Date.now()}-${file.originalname}`)
  }
})
const upload=multer({
  storage:storage
})


router.route('/').post(protect,admin,upload.single("categoryImage"),createCategory).get(getAllCategories)
router.route('/updatecategory').post(protect,admin,upload.single("categoryImage"),updateCategory)
router.route('/getsinglecategory').post(protect,admin,getCategoryByid)
router.route('/deletecategory').post(protect,admin,deleteCategory)

module.exports=router
