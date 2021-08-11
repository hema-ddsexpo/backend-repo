const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const MySqlStore = require('express-mysql-session')(session);
const Router = require('./Router');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'myapp'

}

);

db.connect(function (err) {
    if (err) {
        console.log('database error');
        throw err;
        return false;

    }
});

const sessionStore = new MySqlStore({
    expiration: (1825 * 56000 * 1000),
    endConnectionOnClose: false
}, db);

app.use(session({
    key: 'asfgertyfdsaggfgdaewq',
    secret: 'qwqerrgfsdhgjkkjfdgsahj',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1825 * 56000 * 1000),
        httpOnly: 'false'
    }
}));

new Router(app, db);
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000);