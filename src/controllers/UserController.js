import multer from 'multer';
import path from 'path';
import fs from 'fs';
import 'dotenv/config';
import database from '../database/connection';
import multerConfig from '../config/multer';

export default {
  create: (req, res) => {
    const uploadFunction = multer(multerConfig).single('file');
    return uploadFunction(req, res, async err => {
      if (err) return res.json({ success: false, message: err.toString() });
      const user = req.body;
      if (!user.name) {
        fs.unlink(path.resolve(__dirname, '..', '..', 'uploads', req.file.filename), err => err ? console.error(err) : null);
        return res.json({ success: false, message: 'Necessário informar o nome do usuário' });
      }
      if (req.file && req.file.filename) user['photo'] = `${process.env.SERVER_URL}/images/${req.file.filename}`;
      const [id] = await database('users').insert(user);
      return id ? res.json({ success: true, message: 'Usuário criado com sucesso', user: { ...user, id } })
        : res.json({ success: true, message: 'Ocorreu um erro ao criar o usuário' });
    })
  },
  index: async (id) => {
    try {
      return await database('users').whereNot({ id }).select(['*']);
    } catch (err) {
      return [];
    }
  },
  read: async (id) => {
    try {
      return await database('users').where('id', id).select(['*']);
    } catch (err) {
      return [];
    }
  },
  setOnline: async (id) => {
    try {
      await database('users').where('id', id).update({ online: true });
    } catch (err) {
      console.log(err)
    }
  },
  setOffline: async (id) => {
    try {
      await database('users').where('id', id).update({ online: false });
    } catch (err) {
      console.log(err)
    }
  },
}