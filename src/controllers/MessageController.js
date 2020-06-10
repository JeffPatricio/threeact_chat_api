import 'dotenv/config';
import database from '../database/connection';

export default {
  create: ({ id_sender, id_receiver, text }) => {
    return new Promise(async (res) => {
      const session = id_receiver === 0 ? 0 : id_receiver < id_sender ? parseInt(`${id_receiver}${id_sender}`) : parseInt(`${id_sender}${id_receiver}`);
      const newMessage = { id_sender, id_receiver, text, read: false, send_date: Date.now(), session }
      const [id] = await database('messages').insert(newMessage);
      id ? res({ ...newMessage, id }) : res(null);
    })
  },
  index: async (sessionId) => {
    try {
      return await database('messages').where('session', sessionId).select(['*']);
    } catch (err) {
      return [];
    }
  }
}