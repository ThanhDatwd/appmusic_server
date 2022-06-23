// const cloudinary = require('cloudinary').v2

// const storage = multer.diskStorage({
//     filename: (req, file, cb) => {
//       const fileExt = file.originalname.split(".").pop();
//       const filename = `${new Date().getTime()}.${fileExt}`;
//       cb(null, filename);
//     },
//   });

//   // Filter the file to validate if it meets the required audio extension
//   const fileFilter = (req, file, cb) => {
//     if (file.mimetype === "audio/mp3" || file.mimetype === "audio/mpeg") {
//       cb(null, true);
//     } else {
//       cb(
//         {
//           message: "Unsupported File Format",
//         },
//         false
//       );
//     }
//   };

//   // Set the storage, file filter and file size with multer
//   const upload = multer({
//     storage,
//     limits: {
//       fieldNameSize: 200,
//       fileSize: 5 * 1024 * 1024,
//     },
//     fileFilter,
//   }).single("audio");

//   // upload to cloudinary
//   upload(req, res, (err) => {
//     if (err) {
//       return res.send(err);
//     }

//     // SEND FILE TO CLOUDINARY
//     cloudinary.config({
//       cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//       api_key: process.env.CLOUDINARY_API_KEY,
//       api_secret: process.env.CLOUDINARY_API_SECRET,
//     });
//     const { path } = req.file; // file becomes available in req at this point

//     const fName = req.file.originalname.split(".")[0];
//     cloudinary.uploader.upload(
//       path,
//       {
//         resource_type: "raw",
//         public_id: `AudioUploads/${fName}`,
//       },

//       // Send cloudinary response or catch error
//       (err, audio) => {
//         if (err) return res.send(err);

//         fs.unlinkSync(path);
//         res.send(audio);
//       }
//     );
//   });
const cloudinary = require('cloudinary').v2
cloudinary.config({
        cloud_name: "thanh-dat",
        api_key: "581467954362346",
        api_secret: "k1VQ_2aNZ88zzVauY1dN-_Mda9A",
        secure: true
      });
module.exports={cloudinary}