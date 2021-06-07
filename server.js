const express = require('express');
const routes = require('./routes');
const Sequelize = require('./config/connection');
const { sequelize } = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//turn on routes
app.use(routes);

// turn on connection to db and server
//The "sync" part means that this is Sequelize taking the models and connecting them to associated database tables.
//{force: false} - do not drop/recreate all database tables on startup
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});