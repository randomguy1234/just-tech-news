const router= require('express').Router();
const { response } = require('express');
const {User}= require('../../models');

//GET /api/users
router.get('/', (req, res)=>
{
    // Access our User model and run .findAll() method)
    User.findAll({
        attributes: {excludes: ['password']}
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => 
            {
                console.log(err);
                res.status(500).json(err);
            });
});

//GET /api/users/1
router.get('/:id', (req, res)=>
{
    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData =>
            {
                if (!dbUserData)
                {
                    res.status(404).json({message: 'No user found with this id'});
                    return;
                }
                res.json(dbUserData);
            })
        .catch(err =>
            {
                console.log(err);
                res.sendStatus(500).json(err);
            });
});

//POST /api/users
router.post('/', (req, res)=>
{
   // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
   User.create({
       username: req.body.username,
       email: req.body.email,
       password: req.body.password
   })
    .then(dbUserData=> res.json(dbUserData))
    .catch(err=>
        {
            console.log(err);
            res.status(500).json(err);
        });
});

//PUT /api/users/1
router.put('/:id', (req, res)=>
{
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    
    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData=>
            {
                if (!dbUserData[0])
                {
                    res.status(404).json({message: 'No user found within this id'});
                    return;
                }
                res.json(dbUserData);
            })
        .catch(err=> 
            {
                console.log(err);
                response.status(500).json(error);
            });    
});

//DELETE /api/users/1
router.delete('/:id', (req, res)=>
{
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData=>
            {
                if (!dbUserData)
                {
                    res.status(404).json({message: 'No user found with this id'});
                    return;
                }
                res.json(dbUserData);
            })
        .catch(err =>
            {
                console.log(err);
                res.status(500).json(err);
            });    
});

module.exports= router;