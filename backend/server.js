const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const ProductRoutes = require('./routes/ProductRoutes')
const cartRoutes = require('./routes/cartRoutes')

const app = express()
app.use(express.json())
app.use(cors())

dotenv.config()

const PORT = process.env.PORT || 3000

connectDB();

app.get('/',(req, res) => {
    res.send('WELCOME TO TRENZIA API !')
})

//API Routes
app.use('/api/users', userRoutes)
app.use('/api/products', ProductRoutes)
app.use('/api/cart', cartRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})