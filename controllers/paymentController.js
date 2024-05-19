const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('../models/booking');
const Payment = require('../models/payment');
const Car = require('../models/Car');

exports.createPaymentIntent = async (req, res) => {
    const { bookingId } = req.body;

    try {
        const booking = await Booking.findByPk(bookingId, { include: Car });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const amount = calculateAmount(booking);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            payment_method_types: ['card'],
        });

        const payment = await Payment.create({
            bookingId: booking.id,
            amount: amount / 100,
            status: 'pending',
            paymentIntentId: paymentIntent.id
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret, paymentId: payment.id });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const calculateAmount = (booking) => {
    const durationInDays = (new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24);
    return booking.Car.pricePerDay * durationInDays * 100;
};
