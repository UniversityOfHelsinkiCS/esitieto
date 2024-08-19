const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('loyda tama', req.headers.cookie)
    console.log('uid', req.headers.uid)
    res.json(req.headers);
    console.log(res.json)
});

module.exports = router;