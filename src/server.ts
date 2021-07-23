
import { router as authRoutes } from './routes/auth';
import { router as userRoutes } from './routes/users';
import { router as postRoutes } from './routes/posts';
import { router as commentRoutes } from './routes/comments';
import express, {Application} from 'express';
import cors from 'cors';
import logger from 'morgan';

export const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(logger('tiny'));
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);



