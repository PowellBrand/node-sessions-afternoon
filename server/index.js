const express = require('express')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , checkForSession = require('./middlewares/checkForSession')
    , swag = require('./controller/swag_controller')
    , auth = require('./controller/auth_controller')
    , cart = require('./controller/cart_controller')
    , search = require('./controller/search_controller');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(checkForSession);
//swag endpoints
app.get('/api/swag', swag.read);

//auth endpoints
app.post('/api/login', auth.login);
app.post('/api/register', auth.register);
app.post('/api/signout', auth.signout);
app.get('/api/user', auth.getUser);


//cart endpoints
app.post('/api/cart', cart.add);
app.post('/api/cart/checkout', cart.checkout);
app.delete('/api/cart', cart.remove);

//search endpoints
app.get('/api/search', search.search)

const port = 4000;
app.listen(port, () => {
    console.log(`I'm listening on port: ${port}.`)
})
