const asyncHandler = require('express-async-handler');
const User = require('../models/users.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../../utils/sendemail.js');
const crypto = require('crypto');
const fs = require('fs');


// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  // profileImage  
  const { userName, firstName, lastName,email,password,mobileNumber ,displayName,region} = req.body;
  if ( !userName || !firstName || !lastName || !email || !password || !mobileNumber  || !displayName || !region) {
    throw new Error("provide all details during registeration ...");
  }
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const hashedpassword = await bcrypt.hash(req.body.password, 10);
  const code=crypto.randomBytes(32).toString('hex')

  const newUser = new User({
    userName,
    firstName,
    lastName,
    email,
    password: hashedpassword,
    mobileNumber,
    displayName,
    region,
    VerficationCode:code,
  });
  
  
  const user = await newUser.save();
  sendEmail(req.body.email,`<h4>click on following link to verify your email</h4><br/><a href=https://pro-shop-ecommerce.onrender.com/verify/${code}>Click Here</a><br/><p>If you have not requested then please ignore it</p>`)
  res.status(200).json({"success":true,"message":user})
});
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public


const authUser = asyncHandler(
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
 if(!email ||!password){
  res.status(200).json({ success: false, message: "provide all credentials" });

 }
    const user = await User.findOne({ email: req.body.email });
    if (user===null) {
      throw new Error("Invalid  email or password");
    } else {
      const validate = await bcrypt.compare(req.body.password, user.password);
      if (validate) {
      
        const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
          expiresIn: "10hr",
        });
        res.cookie("token", token, {
          path: "/",
          expires: new Date(Date.now() + 1000 * 36000),
          httpOnly: true,
          sameSite: "lax",
        });
        res.status(200).json({ success: true, message: user, token: token });
    }else {
        res.status(401);
        throw new Error("Invalid email or password");
      }
    }
  })
);
const logout = asyncHandler(
  asyncHandler(async (req, res) => {
    res.clearCookie('token')
    req.cookies.token=''
    res.status(200).json({"success":true ,"message":"logout successfully"})
      })
);
const verifyEmail=asyncHandler(
  asyncHandler(async(req,res)=>{
   const user=await User.findOne({"VerficationCode":req.body.code});
   if(user!==null){
    await User.updateOne({"VerficationCode":req.body.code},{"isVerified":true ,"VerficationCode":""});
  
    res.status(200).json({ success: true, message:"email verified succesfully" });
  
   }else{
    res.status(200).json({"success":false,"message":"wrong VerificationCode provided"})
   }
  })
)
const forgetPassword=asyncHandler(
  asyncHandler(async(req,res)=>{
   const us=await User.findOne({"email":req.body.email});
   if(!us){
   return res.status(200).json({"success":false,"message":"no user found !"})
   }
   const code=crypto.randomBytes(32).toString('hex')
   const u=  await User.updateOne({"email":us.email},{"ForgetPasswordCode":code })
     sendEmail(req.body.email,`<h4>click on following link to reset  your password</h4><br/><a href=https://pro-shop-ecommerce.onrender.com/reset/${code}>Click Here</a><br/><p>If you have not requested then please ignore it</p>`)

     res.status(200).json({ success: false, message: "Credentials for resetting account has been send to your email" });
  })
)

const resetPassword=asyncHandler(
  asyncHandler(async(req,res)=>{
    const user=await User.findOne({"ForgetPasswordCode":req.body.code});
    if(user!==null){
      let newpassword= await bcrypt.hash(req.body.password, 10);
      
     await User.updateOne({"email":user.email},{"password":newpassword ,"ForgetPasswordCode":""});
   
     res.status(200).json({ success: true, message:"Reset Password succesfully" });
   
    }else{
     res.status(200).json({"success":false,"message":"wrong VerificationCode provided"})
    }
  })
)



// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      "success":true,"message":user });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateProfileImage = asyncHandler(async (req, res) => {
  console.log("uploading image...")
  console.log(req.file)
  const user = await User.findById(req.user._id);

  if (user) {
    if(user.profileImage){
      fs.unlink(`./uploads/users/${user.profileImage}`, function (err) {
        if (err) {
            console.log("some error occured while deleting file")
        }else{
          console.log("file deleted succesfully !")
        }
    })}

     let filepath= req.file.path.split('\\').pop();
    const t=await User.findByIdAndUpdate(req.user._id,{profileImage:filepath})

  res.json({
    success: true,
    message: t,
  });

  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
   
  const t=await User.findByIdAndUpdate(req.user._id,{
  Bio:req.body.bio,
  youtube:req.body.youtube,
  instagram:req.body.instagram,
  facebook:req.body.facebook
      
      }
        )

    res.json({
      success: true,
      message: t,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const updateUserPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const validate = await bcrypt.compare(req.body.currentpassword, user.password);
    
    if (validate) {
     let   hashedpassword = await bcrypt.hash(req.body.newpassword, 10);

       const t=await User.findByIdAndUpdate(req.user._id,{
        password: hashedpassword})

    res.json({
      success: true,
      message: t,
    });
          
    }else{
      res.json({
        success: false,
        message: "wrong password provided !",
      });
    }
 

  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).sort({ createdAt : -1});
  res.json({"success":true,"message":users});
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);


  if (user) {
   await stays.deleteMany({"user":req.params.id})
   await events.deleteMany({"user":req.params.id})
   await  blogs.deleteMany({"user":req.params.id})

   //need to write code for deleting images of  blopost also---->missing here

    await user.remove();
    res.json({"success":true, "message": "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  console.log(req.params.id)
  const user = await User.findOne({"_id" : req.params.id}).select("-password");
 console.log(user)
  if (user) {
    res.json({"success":true,"message":user});
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({"success":true,"message":updateUser });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports= {
  authUser,
  registerUser,
  getUserProfile,
  logout,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  forgetPassword,
  updateProfileImage,
  resetPassword,
  updateUserPassword,
  updateUser,
  verifyEmail
};
