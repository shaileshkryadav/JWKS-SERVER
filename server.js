const express = require('express');
const keyStore = require('./keyStore');
const jwksRoute = require('./routes/jwks');
const authRoute = require('./routes/auth');

const app = express();
app.use(express.json());

app.use(jwksRoute);
app.use(authRoute);

// Generate keys immediately when file loads
keyStore.generateKey(3600);    // valid
keyStore.generateKey(-3600);   // expired

// Only start server if NOT running tests
if (process.env.NODE_ENV !== 'test') {
    app.listen(8080, () => {
        console.log("JWKS Server running on port 8080");
    });
}

module.exports = app;