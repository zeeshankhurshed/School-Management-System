import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import  connectDB  from './config/db.js';
import userRoutes from './routes/user.js';
import classesRoutes from './routes/classes.js';
import studentRoutes from './routes/student.js';
import teacherRoutes from './routes/teacher.js';
import resultRoutes from './routes/result.js';
import subjectRoutes from './routes/subject.js';
import feeRoutes from './routes/fee.js';
import blogRoutes from './routes/blog.js';
import uploadRoutes from './routes/upload.js';
import path from 'path';
import cors from 'cors';

dotenv.config();

connectDB();


const app = express()

//middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const PORT =process.env.PORT || 9901

//routes
app.use('/users',userRoutes);
app.use('/classes', classesRoutes);
app.use('/student', studentRoutes);
app.use('/teacher', teacherRoutes);
app.use('/result', resultRoutes);
app.use('/subject', subjectRoutes);
app.use('/fee', feeRoutes);
app.use('/blog', blogRoutes);

app.use("/upload",uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname+ '/uploads')));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})