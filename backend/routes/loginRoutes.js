const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.json({
        kirjauduttu: req.kirjauduttu,
        user: req.user ? req.user: null,
     });
});

module.exports = router;