import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import homeRoute from './routes/home';
import customerRoute from './routes/customers';
import productRoute from './routes/products';
import cartRoutes from './routes/carts';
import adminRoute from './routes/admin';

config();
const app = express();
const port = process.env.PORT || 5050;
mongoose.connect(process.env.CONNECTIONSTRING, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(() => {
  app.emit('conected');
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Home Routes
app.use('/v1', homeRoute);

// Customer Routes
app.use('/v1/customers', customerRoute);

// Products Routes
app.use('/v1/products', productRoute);

// Cart Routes
app.use('/v1/cart', cartRoutes);

// Admin Routes
app.use('/v1/admin', adminRoute);

app.on('conected', () => {
  app.listen(port);
});
