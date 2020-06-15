const router = require('express').Router();
const userController = require('./../controller/user');
const { response } = require('../middleware/middleware');

router.post('/register', async function(req, res) {
    let response=await userController.register(req.body.username,req.body.password);
    res.send(response);
});

router.post('/login', async function(req, res) {
    let response=await userController.login(req.body.username,req.body.password);
    res.send(response);
});


module.exports = router;