const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
const Cart = require('./models/Cart');
const products = require('./data/products');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)

//Function to seed data

const seedData = async () => {
    try {
        // Clear existing data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        // Create admin user
        const createdUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: '123456',
            role: 'admin',
        });

        const userId = createdUser._id;

        // Create sample products
        const sampleProducts = products.map((product) =>{ return {...product, user: userId }
        });

        await Product.insertMany(sampleProducts);

        console.log('Data seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

// Run the seed function
seedData();
