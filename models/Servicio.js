import mongoose,{Schema} from "mongoose";

const ServicioSchema = new Schema({
    title:{type:String, maxlength:250, required:true},
    description:{type:String, required:true},
    price_pesos:{type:Number, required:true},
    imagen:{type:String, maxlength:250, required:true},
    state:{type:Number, maxlength:1, default:1},
},{
    timestamps: true
});

const Servicio = mongoose.model("servicios", ServicioSchema);
export default Servicio;