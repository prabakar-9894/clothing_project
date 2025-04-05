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
import ProductRouter from './routes/ProductRouter.js';
import UserRouter from './routes/UserRouter.js';
import CartRouter from './routes/CartRouter.js';

// Load environment variables from .env
dotenv.config();

// Fix __dirname issue in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Security & Middleware
app.use(cors({
  origin: '*', // Replace '*' with trusted domains for production
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); // Secure HTTP headers
app.use(morgan('dev')); // Logger for debugging

// Configure static file serving with CORS headers
app.use("/img/uploads", express.static(path.join(__dirname, "uploadsImages"), {
  setHeaders: (res) => {
    res.set("Cross-Origin-Resource-Policy", "cross-origin"); // Allow cross-origin
  }
}));

// Additional static file route
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Set up routers
app.use('/', ProductRouter);
app.use('/', UserRouter);
app.use('/', CartRouter);

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Graceful exit
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))