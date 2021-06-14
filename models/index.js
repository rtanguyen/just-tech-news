const User = require('./User');
const Post = require('./Post')
const Vote = require('./Vote')
const Comment = require('./Comment')


//==== create associations ====
User.hasMany(Post, {
    foreignKey: 'user_id'
});

//Post can only belong to one user
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

//see which posts a single user voted on
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

// see which users voted on a single post
Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
})

//NOTE: do not need to specify Comment as through table since not many-to-many
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Vote, Comment };