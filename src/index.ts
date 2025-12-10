import express from 'express';
import 'reflect-metadata';
import courseRoutes from './routes/course.routes.js';
import userRouter from './routes/user.routes.js';
import { errorHandler } from './utils/error/errorhandler.js';

const app = express();

const Port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRouter);
app.use('/course', courseRoutes);
app.use(errorHandler);
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});

// TODO Create Errorhandling middleware
