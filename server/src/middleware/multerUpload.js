import multer from "multer";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = file.mimetype.replace(/[^\n]+\//, "");
    cb(null, file.fieldname + '-' + uniqueSuffix + "." + extension);
  }
});

export const upload = multer({ storage });
