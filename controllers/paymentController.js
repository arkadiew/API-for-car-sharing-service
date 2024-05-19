const Booking = require('../models/booking');
const Payment= require('../models/payment');



exports.createPayment = async (req, res) => {
  try {
    const { userId, bookingId, amount,paymentIntentId } = req.body;
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    const payment = await Payment.create({ userId, bookingId, amount,paymentIntentId,  status: 'completed' });
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
