import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import routes from './routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);
const server = app.listen(process.env.PORT, () => console.log(`Server running in port ${process.env.PORT}`));

export default server