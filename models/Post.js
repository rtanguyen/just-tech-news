const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create Post model 
class Post extends Model {
    //static keyword indicates that upvote method is based on Post model and not an instance method 
        //can execute Post.upvote() 
    static upvote(body, models) {
        //pass the Vote model in as an argument from post-routes.js
        return models.Vote.create({
            user_id: body.user_id,
            post_id: body.post_id
        }).then(() => {
            return Post.findOne({
                where: {
                    id: body.post_id
                },
                attributes: [
                    'id',
                    'post_url',
                    'title',
                    'created_at',
                    [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
                ]
            });
        });
    }
}

//create fields/columns for Post model
Post.init(
    //first parameter - defining schema 
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            //reference id column of User model - foreign key
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    //second parameter - configure options
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;