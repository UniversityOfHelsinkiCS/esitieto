const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.json({
        kirjauduttu: req.kirjauduttu,
        uid: req.user ? req.user.username: null,
     });
});

module.exports = router;