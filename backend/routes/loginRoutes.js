const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.json(req.kirjauduttu);
});


module.exports = router;