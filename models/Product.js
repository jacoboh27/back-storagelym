import mongoose,{Schema} from "mongoose";

const ProductSchema = new Schema({
    title:{type:String, required:true, maxlength:250},
    slug:{type:String, required:true, maxlength:1000},
    categorie:{type:Schema.ObjectId, ref:'categorie', required:true},
    price_pesos:{type:Number, required:true},
    imagen:{type:String, required:true},
    state:{type:Number, maxlength:1, default:1},//1:publico, 2: no publico.
    stock:{type:Number, default:1},
    description:{type:String, required:true}
},{
    timestamps:true,
});

const Product = mongoose.model('product', ProductSchema);
export default Product;