// import express from "express";
// import { Herobanner } from '../models/products.js';
// import { Allproductsdata } from '../models/products.js';

// const router = express.Router();

// // Function to create routes
// const createRoute = (path, model) => {
//   router.get(path, async (req, res) => {
//     try {
//       const products = await model.find();
//       res.json(products);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });
// };

// createRoute("/herobanners", Herobanner);
// createRoute("/allproductsdatas", Allproductsdata);

// export default router;

import express from "express";
import path from "path";
import multer from "multer";
import fs from "fs";
import { Herobanner, Allproductsdata } from "../models/products.js";

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join("uploadsImages");
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage });

// Route Factory for Adding Products
const createRoute = (path, Model) => {
    router.post(path, upload.single("image"), async (req, res) => {
        try {
            if (!req.file) return res.status(400).json({ message: "No image uploaded" });

            const { Name, Price } = req.body;
            const Image = `http://localhost:5011/img/uploads/${req.file.filename}`;

            // Save to MongoDB
            const newProduct = await Model.create({ Name, Image, Price });

            res.status(201).json({ message: "Product added successfully!", product: newProduct });
        } catch (error) {
            res.status(500).json({ message: "Error adding product", error });
        }
    });
}

createRoute("/herobanners", Herobanner);
createRoute("/allproductsdatas", Allproductsdata);

// Route Factory for Fetching Data
const createProductRoute = (path, Model) => {
    router.get(path, async (req, res) => {
        try {
            const data = await Model.find();
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: "Error fetching products", error });
        }
    });
};

// Use Routes
createProductRoute("/herobannersData", Herobanner);
createProductRoute("/allproductsData", Allproductsdata);

export default router