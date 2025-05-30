import express from 'express';
import userRouter from './routes/user.routes.js';
import courseRoutes from './routes/course.routes.js';

const app = express();

const Port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRouter);
app.use('/course', courseRoutes);
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});
