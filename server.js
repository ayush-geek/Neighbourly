const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const colors = require('colors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
// const path = require('path')

//env config
// if not in root specify path
dotenv.config()

//mongoDB Connection
connectDB();

//router import
const userRoutes = require('./routes/userRoute')
const blogRoutes = require('./routes/blogRoute')
const tagRoutes = require('./routes/tagRoute')

//rest Object
const app = express()

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/tags", tagRoutes);



// static files
// app.use(express.static(path.join(__dirname, './client/build')))

// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, './client/build/index.html'))
// });


//PORT
const PORT = process.env.PORT || 8080

//listen
app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} port no ${PORT}`.bgCyan.white);
});
