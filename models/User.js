const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create User model
class User extends Model {}

//initialize 'User' model, pass two objects as arguments to define table columns and configuration
User.init(
    { 
    // TABLE COLUMN DEFINITIONS GO HERE
        id: {
            //use special Sequelize DataTypes object provide what type of data it is
            type: DataTypes.INTEGER,    
            // this is the equivalent of SQL's `NOT NULL` option
            allowNull: false,
            //instruct that this is the Primary Key
            primaryKey: true,
            //turn on auto increment
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //no duplicates
            unique: true,
            //validator ensures any email data follows the pattern of an email address (i.e., <string>@<string>.<string>
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //password must be at least 4 characters long
                len: [4]
            }
        }
    },
    {
        // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

        //  pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        //don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        //don't pluralize name of database table
        freezeTableName: true,
        //use underscores instead of camel-casing (ie 'comment_text' and not 'commentText')
        underscored: true,
        //make it so our model name stays lowercase in database
        modelName: 'user'
    }
);

module.exports = User;