const bcrypt = require('bcryptjs');
const sequelize = require('./config/database');
const User = require('./models/User');
const Car = require('./models/car');
const Booking = require('./models/booking');
const Payment = require('./models/payment');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = [
        { name: 'John Doe', email: 'john@example.com', password: await bcrypt.hash('password123', 12) },
        { name: 'Jane Smith', email: 'jane@example.com', password: await bcrypt.hash('password123', 12) },
    ];

    const cars = [

        { model: 'Toyota Corolla', pricePerDay: 30,latitude: 40.7128, longitude: -74.0060 ,radius:43, available: true},
        { model: 'Honda Civic', pricePerDay: 35,latitude: 46.7128, longitude: -78.0060 ,radius:65,available: true },
        { model: 'Ford Focus', pricePerDay: 25,latitude: 42.7128, longitude: -75.0060 ,radius:75,available: true },
    ];

    const bookings = [
        { userId: 1, carId: 1, startDate: new Date('2024-06-01'), endDate: new Date('2024-06-10')},
        { userId: 2, carId: 2, startDate: new Date('2024-07-15'), endDate: new Date('2024-07-20')},
    ];

    const payments = [
        { bookingId: 1, amount: 300 , transactionId:"s1" },
        { bookingId: 2, amount: 175 , transactionId:"s2" },
    ];

    try {
        await User.bulkCreate(users);
        await Car.bulkCreate(cars);
        await Booking.bulkCreate(bookings);
        await Payment.bulkCreate(payments);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        sequelize.close();
    }
};

seedDatabase();
