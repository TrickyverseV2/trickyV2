const asyncHandler = require('express-async-handler');
const categories = require('../models/categories.js');
const fs = require('fs');


// @desc    Create new order
// @route   POST /api/orders
// @access  Private

const createCategory = asyncHandler(async (req, res) => {
  const {title,description} = req.body
  if (!title || !description || !req.file) {  

    fs.unlink(`./uploads/categories/${ req.file.path.split('\\').pop()}`, function (err) {
      if (err) {
          console.log("some error occured while deleting file")
      }
  })

    res.status(400)
    throw new Error('all fields  requuired')
  } else {
    let filepath= req.file.path.split('\\').pop();

    const category = new categories({
      title,
      description,
      image:filepath
    })
    const createdCategory = await category.save()

    res.status(201).json({"success":true,"message":createdCategory})
  }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getCategoryByid = asyncHandler(async (req, res) => {
  const category = await categories.findById(req.params.id)

  if (order) {
    res.json({"success":true,"message":category})
  } else {
    res.status(404)
    throw new Error('category not found')
  }
})


// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getAllCategories = asyncHandler(async (req, res) => {
  const cat = await categories.find({})
  res.json({"success":true,"message":cat})
})


const updateCategory = asyncHandler(async (req, res) => {
  console.log(req.body)
    const cat = await categories.findOne({_id:req.body.categoryid});
    console.log(cat)
    if (cat) {

        fs.unlink(`./uploads/categories/${cat.image}`, function (err) {
            if (err) {
                console.log("some error occured while deleting file")
            }
        })


    let filepath= req.file.path.split('\\').pop();


    const t=await categories.findByIdAndUpdate(req.body.categoryid,{
    title:req.body.title,
    description:req.body.description,
    image:filepath
        }
          )
  
      res.json({
        success: true,
        message: t,
      });
    } else {
      
      fs.unlink(`./uploads/categories/${ req.file.path.split('\\').pop()}`, function (err) {
        if (err) {
            console.log("some error occured while deleting file")
        }
    })
      res.status(404);
      throw new Error("category not found");
    }
  });
const deleteCategory = asyncHandler(async (req, res) => {
    const cat = await categories.findById(req.body.categoryid);
    if (cat) {

        fs.unlink(`./uploads/categories/${cat.image}`, function (err) {
            if (err) {
                console.log("some error occured while deleting file")
            }
        })
        
    const t=await categories.deleteOne({"_id":req.body.categoryid})
  
      res.json({
        success: true,
        message: "category deleted successfully",
      });
    } else {
      res.status(404);
      throw new Error("category not found");
    }
  });

  module.exports= {
createCategory,
getAllCategories,
updateCategory,
deleteCategory,
getCategoryByid
}
