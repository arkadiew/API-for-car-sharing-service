const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const Booking = require('./models/booking');
const Car = require('./models/car');
const User = require('./models/User');
const Payment = require('./models/payment');

const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);

Booking.sequelize.sync().then(() => {
  console.log('Database connected and synchronized');
});
Car.sequelize.sync().then(() => {
  console.log('Database connected and synchronized');
});
User.sequelize.sync().then(() => {
  console.log('Database connected and synchronized');
});
Payment.sequelize.sync().then(() => {
  console.log('Database connected and synchronized');
});


module.exports = app;
