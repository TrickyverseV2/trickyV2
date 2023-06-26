// import asyncHandler from 'express-async-handler'
// import stays from '../models/stays.js'

// // @desc    Fetch all stayss
// // @route   GET /api/stayss
// // @access  Public
// const getstayss = asyncHandler(async (req, res) => {

//   const stayss = await stays.find({}).sort({createdAt:-1})


//   res.status(200).json({"success":true,"message":stayss })
// })


// // @desc    Fetch single stays
// // @route   GET /api/stayss/:id
// // @access  Public
// const getstaysById = asyncHandler(async (req, res) => {
//   const stays = await stays.findById(req.params.id)

//   if (stays) {
//     res.json({"success":true,"message":stays})
//   } else {
//     res.status(404)
//     throw new Error('stays not found')
//   }
// })

// // @desc    Delete a stays
// // @route   DELETE /api/stayss/:id
// // @access  Private/Admin
// const deletestays = asyncHandler(async (req, res) => {
//   const stays = await stays.findById(req.params.id)

//   if (stays) {
//     await stays.remove()
//     res.json({"success":true, message: 'stays removed' })
//   } else {
//     res.status(404)
//     throw new Error('stays not found')
//   }
// })

// // @desc    Create a stays
// // @route   POST /api/stayss
// // @access  Private/Admin
// const createstays = asyncHandler(async (req, res) => {
//   let thumbnailimg=""
//   let picturesofstays=["","",""]
//   const stays = new stays({
//     user: req.user._id,
//     title: req.body.title,
//     address: req.address,
//     stayType: req.body.stayType,
//     thumbnail: thumbnailimg,
//     pictures: picturesofstays,
//     price: req.body.price,
//     facilitiesProvided: req.body.facilitiesProvided,
//     description: req.body.description,
//   })

//   const createdstays = await stays.save()
//   res.status(201).json({"success":true,"message":createdstays})
// })

// // @desc    Update a stays
// // @route   PUT /api/stayss/:id
// // @access  Private/Admin
// const updatestays = asyncHandler(async (req, res) => {
//   const {
//     name,
//     price,
//     description,
//     image,
//     brand,
//     category,
//     countInStock,
//   } = req.body

//   const stays = await stays.findById(req.params.id)

//   if (stays) {
//     stays.name = name 
//     stays.price = price
//     stays.description = description
//     stays.image = image
//     stays.brand = brand
//     stays.category = category
//     stays.countInStock = countInStock

//     const updatedstays = await stays.save()
//     res.status(200).json({"successu":true,"message":updatedstays})
//   } else {
//     res.status(404)
//     throw new Error('stays not found')
//   }
// })

// // @desc    Create new review
// // @route   POST /api/stayss/:id/reviews
// // @access  Private
// const createstaysReview = asyncHandler(async (req, res) => {
//   const { rating, comment } = req.body

//   const stays = await stays.findById(req.params.id)

//   if (stays) {
//     const alreadyReviewed = stays.reviews.find(
//       (r) => r.user.toString() === req.user._id.toString()
//     )

//     if (alreadyReviewed) {
//       res.status(400)
//       throw new Error('stays already reviewed')
//     }

//     const review = {
//       name: req.user.name,
//       rating: Number(rating),
//       comment,
//       user: req.user._id,
//     }

//     stays.reviews.push(review)

//     stays.numReviews = stays.reviews.length

//     stays.rating =
//       stays.reviews.reduce((acc, item) => item.rating + acc, 0) /
//       stays.reviews.length

//     await stays.save()
//     res.status(201).json({ "success":true,"message": 'Review added' })
//   } else {
//     res.status(404)
//     throw new Error('stays not found')
//   }
// })

// // @desc    Get top rated stayss
// // @route   GET /api/stayss/top
// // @access  Public
// const getTopstayss = asyncHandler(async (req, res) => {
//   const stayss = await stays.find({}).sort({ rating: -1 }).limit(3)

//   res.status(200).json({"success":true,"message":stayss})
// })

// export {
//   getstayss,
//   getstaysById,
//   deletestays,
//   createstays,
//   searchedstayss,
//   updatestays,
//   createstaysReview,
//   getTopstayss,
// }
