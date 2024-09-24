import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    quantities: {
        type: Number,
        required:true
    },
    name: {
        type: String,
        required:true
    }
}, {
    timestamps:true
})

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;