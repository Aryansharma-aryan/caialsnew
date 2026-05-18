const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./db/db');
const consultRoute = require('./routes/consultRoute');

dotenv.config({ path: path.join(__dirname, '.env') });
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const defaultAllowedOrigins = [
  'https://caialsnew.vercel.app',
  'https://www.caials.in',
  'https://caials.in',
  'https://caialsnew-p3nn.onrender.com',
  'http://localhost:5173',
];

const envAllowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = [...new Set([...defaultAllowedOrigins, ...envAllowedOrigins])];

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);

    console.warn('Blocked by CORS:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', consultRoute);

app.get('/', (req, res) => res.send('Consultancy API Running...'));
app.get('/health', (req, res) => res.status(200).json({ ok: true }));

app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ message: 'Origin not allowed by CORS' });
  }

  return next(err);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
