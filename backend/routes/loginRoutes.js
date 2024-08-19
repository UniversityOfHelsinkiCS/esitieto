const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('loyda tama', req.headers)
    console.log('tassa toinen',req.body)
    res.json(req.headers);
    console.log(res)
});

module.exports = router;