const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: String, required: true },
  foodItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Order', orderSchema);
