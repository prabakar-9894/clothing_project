import express from "express";
import { Pickup } from '../models/products.js';
import { Topofday } from '../models/products.js';
import { Bestofweek } from "../models/products.js";
import { Topwear} from '../models/products.js';
import { Bottomwear} from '../models/products.js';
import { Men} from '../models/products.js';
import { Women } from '../models/products.js';
import { Kid } from '../models/products.js';
import { Herobanner} from '../models/products.js';

const router = express.Router();

// Function to create routes
const createRoute = (path, model) => {
  router.get(path, async (req, res) => {
    try {
      const products = await model.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
};

// Define all your routes
createRoute("/pickuplefts", Pickup);
createRoute("/topofdays", Topofday);
createRoute("/bestofweeks", Bestofweek);
createRoute("/topwears", Topwear);
createRoute("/bottomwears", Bottomwear);
createRoute("/mens", Men);
createRoute("/womens", Women);
createRoute("/kids", Kid);
createRoute("/herobanners", Herobanner);

export default router;
