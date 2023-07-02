const express = require('express');
const dotenv = require('dotenv');
const { errorHandler } = require('./server/middleware/errorMiddleware');
const connectDB = require('./config/db');
const cp = require("cookie-parser");
const cors = require("cors");
const categoryRoutes = require('./server/routes/categoryRoutes');
const userRoutes = require('./server/routes/userRoutes');
const next = require('next');


const dev = process.env.NODE_ENV !== 'production'
const NextApp = next({ dev });
const handle = NextApp.getRequestHandler();

dotenv.config()

connectDB()
NextApp.prepare().then(() => {
const app = express()

app.use(express.static('./uploads'))

app.use(cors({origin:"localhost:3000",credentials:true}))
app.use(express.json())
app.use(cp())
app.use('/api/users', userRoutes)
app.use('/api/categories', categoryRoutes)


app.use(errorHandler)

app.all("*",(req,res)=>{
  return handle(req, res);
})

const PORT = process.env.PORT || 8000

app.listen(
  3000,
  console.log("Server running on port 8000")
)
});