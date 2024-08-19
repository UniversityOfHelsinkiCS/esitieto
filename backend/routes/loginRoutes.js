const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    console.log('loyda tama', req.headers)
    console.log('tassa toinen',req.body)
    console.log('kolkki', res.headers)
    console.log('vimonen', res.body)
    res.json(req.headers);
});

module.exports = router;