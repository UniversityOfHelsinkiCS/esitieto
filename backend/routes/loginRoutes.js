const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    console.log(req.json)
    console.log(res)
    res.json(req.kirjauduttu);
});

module.exports = router;