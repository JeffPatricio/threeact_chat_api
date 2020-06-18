import 'dotenv/config';
import database from '../database/connection';
import UserController from './UserController';

export default {
  create: ({ id_sender, id_receiver, text }) => {
    return new Promise(async (res) => {
      const session = id_receiver === 0 ? 0 : id_receiver < id_sender ? parseInt(`${id_receiver}${id_sender}`) : parseInt(`${id_sender}${id_receiver}`);
      const newMessage = { id_sender, id_receiver, text, read: false, send_date: Date.now(), session };
      const [id] = await database('messages').insert(newMessage);
      const [user] = await UserController.read(id_sender);
      id ? res({ ...newMessage, id, name: user.name }) : res(null);
    })
  },
  index: async (req, res) => {
    try {
      const messages = await database('messages')
        .where('session', req.params.sessionId)
        .orderBy('send_date', 'asc')
        .leftJoin('users', 'users.id', 'messages.id_sender')
        .select(['messages.*', 'users.name']);
      res.json({ success: true, messages });
    } catch (err) {
      return [];
    }
  },
  countNotRead: async (id_sender, id_receiver) => {
    try {
      return await database('messages').where({ id_sender, id_receiver, read: false }).count();
    } catch (err) {
      return [];
    }
  },
  markRead: async (id_sender, id_receiver) => {
    try {
      return await database('messages').where({ id_sender, id_receiver, read: false }).update({ read: true });
    } catch (err) {
      return [];
    }
  }
}