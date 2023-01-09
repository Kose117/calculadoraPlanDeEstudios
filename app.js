require('dotenv').config();
const express = require("express");
const hbs = require('hbs');

const app = express();
const PORT = process.env.PORT;

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
    res.render('plan-de-estudios');
});

app.get('/plan-de-estudios', (req, res) => {
    res.render('plan-de-estudios');
});

app.get('/calculadora-promedio', (req, res) => {
    res.render('calculadora-promedio');
});

app.get('*', (req, res) => {
    res.send('404 | not found')
});

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});