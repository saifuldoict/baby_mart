import express from 'express';
import 'dotenv/config';
import router from './routes/authRoutes.js';
import connectDB from './config/db.js';
import cors from 'cors'

// load env server
const app = express();

const PORT = process.env.PORT || 8000;

// MongoDB database
connectDB();

// CORS configuration
const allowedOrigins = [
  process.env.ADMIN_URL,
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // IMPORTANT if using cookies or auth headers
  })
);
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
