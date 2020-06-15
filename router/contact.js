const router = require('express').Router();
const contactController = require('./../controller/contact');
const { response } = require('../middleware/middleware');

router.post('/add', async function(req, res) {
    let response=await contactController.add(req.body);
    res.send(response);
});

router.get('/', async function(req, res) {
    let response=await contactController.fetch();
    res.send(response);
});
router.put('/update', async function(req, res) {
    let response=await contactController.update(req.query.id,req.body);
    res.send(response);
});
router.delete('/delete', async function(req, res) {
    let response=await contactController.delete(req.query.id);
    res.send(response);
});
router.get('/aggregation', async(req, res)=>{
    let response=await contactController.aggregation();
    res.send(response);
});
module.exports = router;