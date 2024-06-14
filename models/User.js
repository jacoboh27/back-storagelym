import mongoose,{Schema} from "mongoose"

const UserSchema = new Schema({
    identityCard: { type: String, required: true, trim: true },
    rol:{ type: String, maxlength:30, required:true },
    name:{ type: String, maxlength:100, required:true, trim: true },
    surname: { type: String, maxlength:100, required:false, trim: true },
    email: {type: String, maxlength:60, required:true, unique:true, trim: true },
    password: {type: String, maxlength:100, required:true },
    state: { type: Number, maxlength:1, default:1 },
    phone: { type: String, maxlength:15, required:false, trim: true },
    address: { type: String, maxlength:100, required:false, trim: true }
}, {
    timestamps: true
});

const User = mongoose.model("user", UserSchema);

export default User;
