const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb+srv://Layeph:teste@omniweek10layeph-w2aet.gcp.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useCreateIndex: true    
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);