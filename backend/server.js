import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ProductRouter from './routes/ProductRouter.js'
import UserRouter  from './routes/UserRouter.js';
import CartRouter from './routes/CartRouter.js';

dotenv.config();

// Fix __dirname issue in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();


app.use(cors({ origin: '*' })); // Allow all origins
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('dev'));

// User image store :

app.use("/img/uploads", express.static(path.join(__dirname, "uploadsImages"), {
  setHeaders: (res) => {
    res.set("Cross-Origin-Resource-Policy", "same-site"); // ✅ Allow cross-origin access
  }
}));

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// AllProducts image store :

app.use('/',ProductRouter); 
app.use('/',UserRouter);
app.use('/',CartRouter);




const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected successfuly'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Graceful exit
  });

// Start Server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
