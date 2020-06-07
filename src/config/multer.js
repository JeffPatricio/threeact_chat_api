import multer from "multer";
import path from "path";
import crypto from "crypto";

export default {
  dest: path.resolve(__dirname, '..', '..', 'uploads'),
  storage: multer.diskStorage({
    destination: (req, file, callback) => callback(null, path.resolve(__dirname, '..', '..', 'uploads')),
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) return callback(err);
        callback(null, `${hash.toString('hex')}-${file.originalname}`);
      })
    },
  }),
  fileFilter: (req, file, callback) => {
    const allowedMimes = ['image/jpeg', 'image/png'];
    (allowedMimes.includes(file.mimetype)) ? callback(null, true) : callback(new Error("Tipo de arquivo inválido."));
  }
}