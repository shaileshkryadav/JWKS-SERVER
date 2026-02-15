const { generateKeyPairSync } = require('crypto');
const { randomUUID } = require('crypto');

class KeyStore {
    constructor() {
        this.keys = [];
    }

    generateKey(expirySeconds) {
        const { publicKey, privateKey } = generateKeyPairSync('rsa', {
            modulusLength: 2048,
        });

        const kid = randomUUID();
        const expiresAt = Date.now() + expirySeconds * 1000;

        // Export public key to JWK format
        const jwk = publicKey.export({ format: 'jwk' });

        jwk.kid = kid;
        jwk.alg = "RS256";
        jwk.use = "sig";

        this.keys.push({
            kid,
            publicKey,
            privateKey,
            jwk,
            expiresAt
        });
    }

    getValidKeys() {
        return this.keys.filter(k => Date.now() < k.expiresAt);
    }

    getExpiredKey() {
        return this.keys.find(k => Date.now() > k.expiresAt);
    }

    getJWKS() {
        return {
            keys: this.getValidKeys().map(k => k.jwk)
        };
    }

    getSigningKey(expired = false) {
        if (expired) return this.getExpiredKey();
        return this.getValidKeys()[0];
    }
}

module.exports = new KeyStore();