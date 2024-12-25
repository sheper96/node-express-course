require('express-async-errors');
const connectDB = require('./db/connect');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { dbURI } = require('./config')

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

const productsRoutes = require('./routes/products');
app.use('/api/v1/products', productsRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(dbURI);
    app.listen(PORT, () => console.log(`Server is listening port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
