import mongoose,{Schema} from "mongoose";
import { DateTime } from 'luxon';

const productsSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'products' },
    name: { type:String, required:true, maxlength:250 },
    unitPrice: { type:Number, required:true },
    amount: { type:Number, required:true },
}, { _id: false });

const OrderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    phone: { type: String, maxlength:15, required:true, trim: true },
    address: { type: String, maxlength:100, required:true, trim: true },
    products: { type: [productsSchema], required: true },
    totalPrice: { type:Number, required:true },
    state: { type:Number, maxlength:1, default:2 }, //1:completada, 2:pendiente 3:devuelta, 4:cancelada
    paymentMethod: { type:Number, maxlength:1, required:true }, //1:Efectivo - Contra entrega, 2:Transferencia - Contra entrega 3:Transferenica anticipada
},{
    timestamps: { currentTime: () => DateTime.local().toUTC().toMillis() }
});

const Order = mongoose.model("orders", OrderSchema);
export default Order;