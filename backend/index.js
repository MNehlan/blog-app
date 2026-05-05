require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err))
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on ${process.env.PORT}`);
    });
  });
