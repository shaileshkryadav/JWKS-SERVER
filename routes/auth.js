const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const keyStore = require('../keyStore');

router.post('/auth', (req, res) => {
    const expired = req.query.expired !== undefined;

    const key = keyStore.getSigningKey(expired);

    if (!key) {
        return res.status(500).json({ error: "No key available" });
    }

    const payload = {
        sub: "fake-user",
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(key.expiresAt / 1000)
    };

    const token = jwt.sign(payload, key.privateKey, {
        algorithm: "RS256",
        keyid: key.kid
    });

    res.json({ token });
});

module.exports = router;