const router = require('express').Router();
const { User, Post, Vote, Comment } = require('../../models');

//GET /api/users
router.get('/', (req, res) => {
    //User model inherits functionality from the Sequelize Model class. .findAll() is one of the Model class's methods
    //findAll() is JavaScript equivalent to SQL query: SELECT * FROM users;
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        //equivalent to SQL query: SELECT * FROM users WHERE id = 1
        where: {
            id: req.params.id
        },
        include: [
            // NOTE: shows which posts a user has created
            {
                model: Post,
                attributes: ['id', 'title', 'post_url', 'created_at']
            },
            //NOTE: shows posts user commented on
            {
                model: Comment, 
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            },
            // NOTE: shows which posts a user has voted on
            {
                model: Post,
                attributes: ['title'],
                through: Vote,
                as: 'voted_posts'
            }
        ]
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//POST /api/users
router.post('/', (req, res) => {
    //keys are what we defined in the User model and the values are what we get from req.body.
    //equivalent to SQL query: 
        // INSERT INTO users (username, email, password) 
        // VALUES ("Lernantino", "lernantino@gmail.com", "password1234");
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
    //post method used for login since request parameters are carried in req.body
    //versus get method which carries parameters in url string
    //QUERY OPERATION
     User.findOne({
         where: {
             email: req.body.email
         }
     }).then(dbUserData => {
         if(!dbUserData) {
             res.status(400).json({message: 'No user with that email address'});
             return;
         }
        //hashed password stored on dbUserData object
         const validPassword = dbUserData.checkPassword(req.body.password);
            if(!validPassword) {
                res.status(400).json({message: 'incorrect password'});
                return;
            }
            res.json({user: dbUserData, message: 'you are logged in'});
     });
});

// PUT /api/users/1
router.put('/:id', (req, res) => {
     // if req.body has exact key/value pairs to match the model, you can just use `req.body` 
     // equivalent to SQL query: 
        //UPDATE users
        // SET username = "Lernantino", email = "lernantino@gmail.com", password = "newpw123"
        // WHERE id = 1;
  User.update(req.body, {
      individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
      if(!dbUserData[0]) {
          res.status(404).json({ message: 'No user found with this id'});
          return;
      }
      res.json(dbUserData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;