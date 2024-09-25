import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    prodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    quantity: {
        type: Number,
        required: true,
    }
   
}, {
    timestamps:true
})

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;