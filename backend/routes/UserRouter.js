
import express from "express";
import multer from 'multer';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'

const UserRouter = express.Router();


  // JWT Protection Middleware
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized, no token provided' });

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });


// Fetch all users
UserRouter.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Fetch a specific user by ID
UserRouter.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});



// Add a new user
UserRouter.post('/api/users', upload.single('image'), async (req, res) => {
  try {
    const { name, mail, contactNumber, password, confirmPassword } = req.body;
    const image = req.file ? req.file.filename : '';

    if (!name || !mail || !password || password !== confirmPassword) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    // const parsedAddress = JSON.parse(address);

    const newUser = new User({
      name,
      mail,
      contactNumber,
      password,
      image,
      // address: parsedAddress,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Error adding user' });
  }
});





// Login Route
UserRouter.post('/api/login', async (req, res) => {
  const { mail, password } = req.body;

  if (!mail || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ mail });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error during login', error: err });
  }
});


// Get Logged-in User
UserRouter.get('/api/user/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ email: user.mail });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user details', error: err });
  }
});


export default UserRouter;