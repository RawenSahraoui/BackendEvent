const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const registrationRoutes = require('./routes/registration');
app.use('/api/registration', registrationRoutes);

const contactRoutes = require('./routes/comment');
app.use('/api/comment', contactRoutes);

connectDb = async () => {
  try {
    await mongoose.connect('mongodb+srv://rawensahraoui:07247213@cluster0.gx532b1.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("db connected")
  } catch (error) {
    console.log(error.message)
  }
}

app.listen(8000, () => {
  connectDb()
  console.log("listening on port 8000 ! ");
});

