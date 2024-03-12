const express = require('express');
const router = express.Router();

router.get('/', async (request, response) => {
    await new Promise(r => setTimeout(r, 2000));
    response.redirect('/esitieto')
});


module.exports = router;