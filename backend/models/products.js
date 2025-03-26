
import mongoose from 'mongoose';

// Product Schema
const ProductSchema = new mongoose.Schema({
    img: String,
     Image: String,
    Categorys: String,
    Name: String
});

// Export Models
export const Herobanner = mongoose.model("herobanners", ProductSchema);
export const Allproductsdata = mongoose.model("allproductsdatas", ProductSchema);
export default { Allproductsdata, Herobanner };