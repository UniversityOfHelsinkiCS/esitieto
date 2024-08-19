const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    console.log(req.headers)
    console.log(req.body)
    console.log(res.headers)
    console.log(res.body)
    res.json(req.kirjauduttu);
});

module.exports = router;