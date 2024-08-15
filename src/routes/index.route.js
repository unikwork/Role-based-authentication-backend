const router = require('express').Router();

// Routes
const userRoute = require('./user.route');


router.use('/', userRoute);


module.exports = router