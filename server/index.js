import express from 'express';
import 'dotenv/config';
import router from './routes/authRoutes.js';
import connectDB from './config/db.js';

// load env server
const app = express();

const PORT = process.env.PORT || 8000;

// MongoDB database
connectDB();

// CORS configuration


// Increase body size limit for JSON and URL-encoded payloads
app.use(express.json());


//Route
app.use("/api/auth",router)



//Home ROute
app.get('/', (req, res) => {
  res.send('Hello from Baby Mart Server side.....tracking');
});


//Error handle


//Start server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  console.log(`ADMIN_URL: ${process.env.ADMIN_URL}`);
  console.log(`CLIENT_URL:${process.env.CLIENT_URL}`);
  console.log(`API docs available at: http://localhost:${PORT}/pai/docs`)
});
