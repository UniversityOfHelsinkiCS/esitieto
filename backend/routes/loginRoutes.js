const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('loyda tama', req.headers.cookie)
    res.json(req.headers);
    console.log(res.json)
});

module.exports = router;