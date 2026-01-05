const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const foodRoutes = require('./routes/foodRoutes');
let someRouter;

try {
  someRouter = require('./routes/someRouter');
  if (typeof someRouter !== 'function') {
    throw new Error("someRouter must be a valid Express router instance");
  }
} catch (error) {
  console.error("Failed to load someRouter:", error.message);
  someRouter = express.Router(); // Use an empty router as a fallback
}

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/some-path', someRouter);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/someRoute', someRouter);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
