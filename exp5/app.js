const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const calculationRoutes = require('./routes/calculations');

const app = express();

mongoose.connect('mongodb://localhost:27017/calculatorDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/calculations', calculationRoutes);
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
