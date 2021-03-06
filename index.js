require('dotenv').config();

// console.log(process.env.SESSION_SECRET);

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');
const authRoute = require('./routes/auth.route');
const cartRoute = require('./routes/cart.route');

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

var port = 3000;
const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.use(express.static('public'));

// Routes
app.get('/', function(req, res) {
    res.render('index', { 
        name: 'Hoang An'
    });
});
app.use('/products', productRoute);
app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/cart', cartRoute);

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});