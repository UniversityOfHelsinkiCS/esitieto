const express = require('express');
const router = express.Router();

router.get('/', async (request, response) => {
    if (request.user != null) {
        response.redirect('/esitieto')
    }

});


module.exports = router;