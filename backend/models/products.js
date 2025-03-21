import mongoose from 'mongoose';

//  Product Model
const ProductSchema = new mongoose.Schema({
    Type:String,
    Id:Number,
    Price:Number,
    Mrp:Number,
    Offer:Number,
    Category:String,
    Quantity:Number,
    Rating:Number,
    Image:String,
    img:String
});


// Export all models
export const Pickup = mongoose.model("pickuplefts", ProductSchema);
export const Topofday = mongoose.model("topofdays", ProductSchema);
export const Bestofweek = mongoose.model("bestofweeks", ProductSchema);
export const Topwear = mongoose.model("topwears", ProductSchema);
export const Bottomwear = mongoose.model("bottomwears", ProductSchema);
export const Men = mongoose.model("mens", ProductSchema);
export const Women = mongoose.model("womens", ProductSchema);
export const Kid = mongoose.model("kids", ProductSchema);
export const Herobanner = mongoose.model("herobanners", ProductSchema);

// const Pickup = mongoose.model("pickuplefts", ProductSchema);
// const Topofday = mongoose.model("topofdays", ProductSchema);
// const Bestofweek = mongoose.model("bestofweeks", ProductSchema);

// const Topwear = mongoose.model("topwears", ProductSchema);
// const Bottomwear = mongoose.model("bottomwears", ProductSchema);
// const Men = mongoose.model("mens", ProductSchema);
// const Women = mongoose.model("womens", ProductSchema);
// const Kid = mongoose.model("kids", ProductSchema);
// const Herobanner = mongoose.model("herobanners", ProductSchema);

export default  { Pickup , Topofday ,Bestofweek ,Topwear ,Bottomwear ,Men ,Women ,Kid ,Herobanner } ;