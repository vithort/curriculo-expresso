const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const createError = require('http-errors');
const CurriculoController = require('./controllers/curriculo-controller');

app.use(express.static(path.join(__dirname, 'public')));

// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res, next) {
    res.render('index', {
        title: "Meu primeiro servidor Express",
        version: "0.0.0"
    });
});

app.get('/curriculo', (req, res, next) => {
    const curriculoData = CurriculoController.getData();
    res.render('curriculo', curriculoData);
});

app.listen(port, err => {
    console.log(`Server is listening on ${port}`);
});

// 404
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});