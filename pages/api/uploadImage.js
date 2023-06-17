import nextConnect from "next-connect";
import multer from "multer";
import cloudinary from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const upload = multer({
  storage: multer.diskStorage({
    destination: "allMediauploads/",
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("file")); // attribute name you are sending the file by

apiRoute.post((req, res) => {
  try {
    cloudinary.uploader.upload(req.file.path, (result) => {
      fs.unlinkSync(req.file.path);
      res.send({ success: true, data: result.secure_url });
    });
  } catch (error) {
    console.log(error, "error");
    res.send({ success: false, data: "Error Occured with Upload" });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
