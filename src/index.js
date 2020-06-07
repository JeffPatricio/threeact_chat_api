import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import 'dotenv/config';
import routes from './routes';

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);
app.use(helmet());
app.listen(process.env.PORT, () => console.log(`Server running in port ${process.env.PORT}`));

