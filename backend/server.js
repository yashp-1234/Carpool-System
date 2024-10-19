const express = require('express')
const dotenv = require('dotenv')
const connectDB = require("./config/db")
const colors = require("colors")
const userRoutes = require("./routes/userRoutes")
const reqRoutes = require("./routes/reqRoutes")
const {notFound} = require("./middlewares/errorMiddleware")
const {errorHandler} = require("./middlewares/errorMiddleware")

const app = express();
dotenv.config();
connectDB();
app.use(express.json())

app.use("/api/user", userRoutes)
app.use("/api/req", reqRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT;
console.log(PORT)
app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow));