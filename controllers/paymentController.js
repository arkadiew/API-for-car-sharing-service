const Booking = require('../models/booking');
const Payment= require('../models/payment');


exports.create = async (req, res) => {
    try {
        const { bookingId, amount } = req.body;

        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const payment = await Payment.create({ bookingId, amount });
        res.status(201).json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.findByBookingId = async (req, res) => {
    const { bookingId } = req.params;
    try {
        const payments = await Payment.findAll({
            where: { bookingId },
            include: [Booking]
        });
        if (!payments) {
            return res.status(404).json({ message: 'Payments not found' });
        }
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

exports.processPayment = async (req, res) => {
    const { paymentId } = req.params;
    const { transactionId } = req.body;

    try {
        const payment = await Payment.findByPk(paymentId);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }


        payment.status = 'completed';
        payment.transactionId = transactionId;
        await payment.save();

        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

exports.cancel = async (req, res) => {
    const { paymentcancelId } = req.params;
    const { transactionId } = req.body;

    try {
        const payment = await Payment.findByPk(paymentcancelId);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }


        payment.status = 'cancelled';
        payment.transactionId = transactionId;
        await payment.save();

        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }};