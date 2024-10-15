
const mongoose = require('mongoose');
require('dotenv').config();

const uri = "mongodb+srv://siamsinister:iecy%2339Zsbz%40fXA@cluster0.bx5x0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
  .then(() => {
    console.log('MongoDB connection established');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });


