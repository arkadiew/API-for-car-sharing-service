const bcrypt = require('bcrypt');
const { sequelize, Car, User, Booking, Payment, Location, ImgCar } = require('./models');

const seed = async () => {
    // Delete all entries in the database
    await sequelize.drop();
    await sequelize.sync({ force: true });

    // Function to hash passwords
    const hashPassword = async (password) => {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    };

    // Seed Users
    const users = [
        {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: await hashPassword('password123'),
            passport_number: '123456789',
            passport_expiry_date: new Date('2025-12-31'),
            telefon: '1234567890',
        },
        {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            password: await hashPassword('password123'),
            passport_number: '987654321',
            passport_expiry_date: new Date('2026-11-30'),
            telefon: '0987654321',
        },
        {
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            password: await hashPassword('password123'),
            passport_number: '456789123',
            passport_expiry_date: new Date('2024-10-15'),
            telefon: '1122334455',
        },
        {
            name: 'Bob Brown',
            email: 'bob.brown@example.com',
            password: await hashPassword('password123'),
            passport_number: '789123456',
            passport_expiry_date: new Date('2025-06-20'),
            telefon: '2233445566',
        },
        {
            name: 'Carol White',
            email: 'carol.white@example.com',
            password: await hashPassword('password123'),
            passport_number: '321654987',
            passport_expiry_date: new Date('2026-04-22'),
            telefon: '3344556677',
        }
    ];

    const createdUsers = await Promise.all(users.map(user => User.create(user)));
// Seed Locations
const locations = [
    {
       
        latitude: 34.0522,
        longitude: -118.2437,
    },
    {
       
        latitude: 40.7128,
        longitude: -74.0060,
    },
    {
       
        latitude: 37.7749,
        longitude: -122.4194,
    },
    {
       
        latitude: 51.5074,
        longitude: -0.1278,
    },
    {
      
        latitude: 48.8566,
        longitude: 2.3522,
    }
];

const createdLocations = await Promise.all(locations.map(location => Location.create(location)));
    // Seed Cars
    const cars = [
        {
            make: 'Toyota',
            model: 'Corolla',
            year: 2020,
            pricePerDay: 50,
            color: 'Blue',
            location_id: createdLocations[1].id,
            mileage: 20000,
            transmission_type: 'Automatic',
            fuel_type: 'Petrol',
            number_of_seats: 5,
            license_plate: 'XYZ123',
        },
        {
            make: 'Honda',
            model: 'Civic',
            year: 2019,
            pricePerDay: 45,
            color: 'Red',
            location_id: createdLocations[0].id,
            mileage: 15000,
            transmission_type: 'Manual',
            fuel_type: 'Diesel',
            number_of_seats: 5,
            license_plate: 'ABC789',
        },
        {
            make: 'Ford',
            model: 'Focus',
            year: 2018,
            pricePerDay: 40,
            color: 'Black',
            location_id: createdLocations[2].id,
            mileage: 30000,
            transmission_type: 'Automatic',
            fuel_type: 'Petrol',
            number_of_seats: 5,
            license_plate: 'DEF456',
        },
        {
            make: 'Chevrolet',
            model: 'Malibu',
            year: 2021,
            pricePerDay: 55,
            color: 'White',
            location_id: createdLocations[3].id,
            mileage: 10000,
            transmission_type: 'Automatic',
            fuel_type: 'Petrol',
            number_of_seats: 5,
            license_plate: 'GHI012',
        },
        {
            make: 'BMW',
            model: 'X5',
            year: 2022,
            pricePerDay: 80,
            color: 'Gray',
            location_id: createdLocations[4].id,
            mileage: 5000,
            transmission_type: 'Automatic',
            fuel_type: 'Petrol',
            number_of_seats: 7,
            license_plate: 'JKL345',
        }
    ];
    const createdCars = await Promise.all(cars.map(car => Car.create(car)));

    // Seed Bookings
    const bookings = [
        {
            userId: createdUsers[0].id,
            carId: createdCars[0].car_id,
            startDate: new Date(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            status: 'confirmed',
        },
        {
            userId: createdUsers[1].id,
            carId: createdCars[1].car_id,
            startDate: new Date(),
            endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            status: 'pending',
        },
        {
            userId: createdUsers[2].id,
            carId: createdCars[2].car_id,
            startDate: new Date(),
            endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            status: 'confirmed',
        },
        {
            userId: createdUsers[3].id,
            carId: createdCars[3].car_id,
            startDate: new Date(),
            endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
            status: 'confirmed',
        },
        {
            userId: createdUsers[4].id,
            carId: createdCars[4].car_id,
            startDate: new Date(),
            endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
            status: 'pending',
        }
    ];

    const createdBookings = await Promise.all(bookings.map(booking => Booking.create(booking)));

    // Seed Payments
    const payments = [
        {
            bookingId: createdBookings[0].id,
            amount: 350,
            status: 'paid',
          
        },
        {
            bookingId: createdBookings[1].id,
            amount: 225,
            status: 'pending',
           
        },
        {
            bookingId: createdBookings[2].id,
            amount: 120,
            status: 'paid',
          
        },
        {
            bookingId: createdBookings[3].id,
            amount: 550,
            status: 'paid',
         
        },
        {
            bookingId: createdBookings[4].id,
            amount: 640,
            status: 'pending',
          
        }
    ];

    await Promise.all(payments.map(payment => Payment.create(payment)));

    


    // Seed ImgCar
    const imgCars = [
        {
            car_id: createdCars[0].car_id,
            img_name: 'car1.jpg',
        },
        {
            car_id: createdCars[0].car_id,
            img_name: 'car2.jpg',
        },
        {
            car_id: createdCars[2].car_id,
            img_name: 'car3.jpg',
        },
        {
            car_id: createdCars[2].car_id,
            img_name: 'car4.jpg',
        },
        {
            car_id: createdCars[4].car_id,
            img_name: 'car5.jpg',
        }
    ];

    await Promise.all(imgCars.map(imgCar => ImgCar.create(imgCar)));

    console.log('Database seeded successfully!');
};

seed().catch(console.error);
