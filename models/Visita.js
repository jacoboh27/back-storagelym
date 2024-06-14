import mongoose,{Schema} from "mongoose"

const VisitaSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    serviceId: { type: Schema.Types.ObjectId, ref: 'servicios' },
    nombre: {type: String, maxlength:250, required:true},
    direccion: {type: String, maxlength:250, required:true},
    telefono: {type: String, maxlength:30, required:false},
    fecha: {type: String, maxlength:250, required:true, unique:true},
}, {
    timestamps: true
});

const Visita = mongoose.model("visita", VisitaSchema);

export default Visita;
