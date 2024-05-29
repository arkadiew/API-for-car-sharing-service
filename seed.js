const bcrypt = require('bcryptjs');
const sequelize = require('./config/database');
const User = require('./models/User');
const Car = require('./models/car');
const Booking = require('./models/booking');
const Payment = require('./models/payment');
const Location = require('./models/location');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = [
        { name: 'John Doe', email: 'john@example.com', password: await bcrypt.hash('password123', 12) },
        { name: 'Jane Smith', email: 'jane@example.com', password: await bcrypt.hash('password123', 12) },
    ];

    const locations = [
        { ip_address: '0.0.0.0', city: "Tallinn" },
        { ip_address: '1.1.1.1', city: "Tartu" },
        { ip_address: '2.2.2.2', city: "Narva" },
    ];

    try {
        // Создание пользователей и локаций
        const createdUsers = await User.bulkCreate(users, { returning: true });
        const createdLocations = await Location.bulkCreate(locations, { returning: true });

        // Получение идентификаторов локаций
        const locationIds = createdLocations.map(location => location.id);

        const cars = [
            { model: 'Toyota Corolla', pricePerDay: 30, year: 2004, location_id: locationIds[0] },
            { model: 'Honda Civic', pricePerDay: 35, year: 2004, location_id: locationIds[1] },
            { model: 'Ford Focus', pricePerDay: 25, year: 2004, location_id: locationIds[2] },
        ];

        // Создание автомобилей
        const createdCars = await Car.bulkCreate(cars, { returning: true });

        // Получение идентификаторов автомобилей
        const carIds = createdCars.map(car => car.id);

        const bookings = [
            { userId: createdUsers[0].id, carId: carIds[0], startDate: new Date('2024-06-01'), endDate: new Date('2024-06-10') },
            { userId: createdUsers[1].id, carId: carIds[1], startDate: new Date('2024-07-15'), endDate: new Date('2024-07-20') },
        ];

        // Создание бронирований
        const createdBookings = await Booking.bulkCreate(bookings, { returning: true });

        // Получение идентификаторов бронирований
        const bookingIds = createdBookings.map(booking => booking.id);

        const payments = [
            { bookingId: bookingIds[0], amount: 300, transactionId: "s1" },
            { bookingId: bookingIds[1], amount: 175, transactionId: "s2" },
        ];

        // Создание платежей
        await Payment.bulkCreate(payments);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        sequelize.close();
    }
};

seedDatabase();
