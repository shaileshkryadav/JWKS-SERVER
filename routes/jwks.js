const express = require('express');
const router = express.Router();
const keyStore = require('../keyStore');

router.get('/.well-known/jwks.json', (req, res) => {
    res.json(keyStore.getJWKS());
});

module.exports = router;