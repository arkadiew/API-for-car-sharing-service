const Booking = require('../models/booking');
const Payment= require('../models/payment');
const jwt = require('jsonwebtoken');

exports.create = async (req, res) => {
    try {
        const { bookingId, amount } = req.body;
        const token =  req.headers["x-access-token"];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET,); 
        const userId = decodedToken.userId;
        
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        if (booking.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized to perform this action' });
        }

        const payment = await Payment.create({ bookingId, amount });
        res.status(201).json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};




exports.processPayment = async (req, res) => {
    const { paymentId } = req.params;
  

    try {
        const payment = await Payment.findByPk(paymentId);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }


        payment.status = 'paid';
      
        await payment.save();

        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

exports.cancel = async (req, res) => {
    const { paymentcancelId } = req.params;


    try {
        const payment = await Payment.findByPk(paymentcancelId);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }


        payment.status = 'cancelled';
       
        await payment.save();

        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }};
