const asyncHandler = require('express-async-handler');
const destinations = require('../models/destinations.js');
const fs = require('fs');


// @desc    Create new order
// @route   POST /api/orders
// @access  Private

const createdestination = asyncHandler(async (req, res) => {
  const {title,description} = req.body
  if (!title || !description || !req.file) {  

    fs.unlink(`./uploads/destinations/${ req.file.path.split('\\').pop()}`, function (err) {
      if (err) {
          console.log("some error occured while deleting file")
      }
  })

    res.status(400)
    throw new Error('all fields  requuired')
  } else {
    let filepath= req.file.path.split('\\').pop();

    const destination = new destinations({
      title,
      description,
      image:filepath
    })
    const createddestination = await destination.save()

    res.status(201).json({"success":true,"message":createddestination})
  }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getdestinationByid = asyncHandler(async (req, res) => {
  const destination = await destinations.findById(req.params.id)

  if (destination) {
    res.json({"success":true,"message":destination})
  } else {
    res.status(404)
    throw new Error('destination not found')
  }
})


// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getAlldestinations = asyncHandler(async (req, res) => {
  const cat = await destinations.find({})
  res.json({"success":true,"message":cat})
})


const updatedestination = asyncHandler(async (req, res) => {
    const cat = await destinations.findOne({_id:req.body.destinationid});
    if (cat) {

        fs.unlink(`./uploads/destinations/${cat.image}`, function (err) {
            if (err) {
                console.log("some error occured while deleting file")
            }
        })


    let filepath= req.file.path.split('\\').pop();


    const t=await destinations.findByIdAndUpdate(req.body.destinationid,{
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
      
      fs.unlink(`./uploads/destinations/${ req.file.path.split('\\').pop()}`, function (err) {
        if (err) {
            console.log("some error occured while deleting file")
        }
    })
      res.status(404);
      throw new Error("destination not found");
    }
  });
const deletedestination = asyncHandler(async (req, res) => {
    const cat = await destinations.findById(req.body.destinationid);
    if (cat) {

        fs.unlink(`./uploads/destinations/${cat.image}`, function (err) {
            if (err) {
                console.log("some error occured while deleting file")
            }
        })
        
    const t=await destinations.deleteOne({"_id":req.body.destinationid})
  
      res.json({
        success: true,
        message: "destination deleted successfully",
      });
    } else {
      res.status(404);
      throw new Error("destination not found");
    }
  });

  module.exports= {
createdestination,
getAlldestinations,
updatedestination,
deletedestination,
getdestinationByid
}
