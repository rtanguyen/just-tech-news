//collects packaged API routes and prefixes path with /api

const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

//if we make a request to any endpoint that doesn't exist, we'll receive a 404 error
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;