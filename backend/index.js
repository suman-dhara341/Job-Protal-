const express = require('express')
const DB = require('./utils/DB')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

const userRoute=require('./routes/userRoute')
const companyRoute=require('./routes/companyRoute')
const jobRoute=require('./routes/jobRoute')
const applicationRouter =require('./routes/applicationRouter')

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 8080



// api's
app.use("/api/v1/user", userRoute)
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application", applicationRouter)

DB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is runing on ${PORT}`);
        console.log("DB connected successfully");
    })
})
