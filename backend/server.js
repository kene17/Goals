const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db")
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000;

connectDB()

const app = express();
//middleware for post request
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(port, () => console.log(`server ${port}`));
