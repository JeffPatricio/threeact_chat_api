import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(helmet());

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server running in port ${process.env.PORT || 8080}`);
});