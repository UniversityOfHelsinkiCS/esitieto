const express = require('express');
const router = express.Router();

router.get('/', async (request, response) => {
    response.json(request.kirjauduttu);
});


module.exports = router;