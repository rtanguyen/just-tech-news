//collects endpoints and prefixes path with router.use('/PATHPREFIX')

const router = require('express').Router();

const userRoutes = require('./user-routes');

router.use('/users', userRoutes);

module.exports = router;