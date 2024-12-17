const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const app = express();


app.get('/hello', (req, res,) => {
    res.send('Task Manager App')
})
app.use(express.static('./public'))
app.use(bodyParser.json());

const tasksRoutes = require('./routes/tasks');
app.use('/api/v1/tasks', tasksRoutes)
app.use(notFound)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 3000;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

const dbURI = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}`;

mongoose.connect(dbURI)
    .then(result => {
        app.listen(PORT, () => {
            console.log(`Server is running on port:${PORT}`);
        });
    })
    .catch(err => { console.log(err) })
