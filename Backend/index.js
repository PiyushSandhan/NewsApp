import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoute from './src/routes/protected.route.js';
import userRoute from './src/routes/user.route.js';

dotenv.config();//Load env variables from .env file
const app = express();
const PORT=process.env.PORT || 4000;
app.use(cors());
// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// routes
app.use("/api/v0", productRoute);
app.use("/api/v0/user", userRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

const connectDB = async () => {
  try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('✅ Connected to database!');
      app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
      console.error('❌ Database connection failed:', error);
      process.exit(1); // Exit on database failure
  }
};

connectDB();