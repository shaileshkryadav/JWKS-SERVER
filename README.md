# JWKS Server

A RESTful JSON Web Key Set (JWKS) server implemented in JavaScript using Node.js and Express.

This project demonstrates:

- RSA key pair generation
- Unique Key IDs (`kid`)
- Key expiration handling
- JWT issuance
- JWKS endpoint serving only valid (non-expired) keys
- Unit testing with >90% coverage

> This project is for educational purposes and mocks authentication.

---

## 🚀 Features

- RSA 2048-bit key generation
- Unique `kid` assigned to each key
- Key expiration support
- JWKS endpoint serving only non-expired keys
- `/auth` endpoint issuing signed JWTs
- Support for issuing expired JWTs via query parameter
- Full test suite with coverage >90%

---

## 📁 Project Structure

```
jwks-server/
│
├── server.js
├── keyStore.js
├── routes/
│   ├── auth.js
│   └── jwks.js
├── tests/
│   └── server.test.js
├── screenshots/
│   ├── test-client-running.png
│   └── test-coverage.png
└── README.md
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone <your-repo-url>
cd jwks-server
```

Install dependencies:

```bash
npm install
```

---

## ▶️ Running the Server

Start the server:

```bash
node server.js
```

The server runs on:

```
http://localhost:8080
```

---

## 🔑 API Endpoints

### 1️⃣ Get JWKS

```
GET /.well-known/jwks.json
```

Returns only non-expired public keys in JWKS format.

Example:

```bash
curl.exe http://localhost:8080/.well-known/jwks.json
```

---

### 2️⃣ Issue JWT

```
POST /auth
```

Returns a signed JWT using a valid key.

Example:

```bash
curl.exe -X POST http://localhost:8080/auth
```

---

### 3️⃣ Issue Expired JWT

```
POST /auth?expired=true
```

Returns a JWT signed with an expired key and expired `exp` claim.

Example:

```bash
curl.exe -X POST http://localhost:8080/auth?expired=true
```

---

## 🧪 Running Tests

Run the test suite:

```bash
npx jest --coverage
```

The test suite includes:

- Endpoint testing
- JWT issuance testing
- Error handling testing
- Coverage above 80% (currently >90%)

## 🔐 JWT Details

- Algorithm: RS256
- Includes `kid` in JWT header
- `exp` claim based on key expiry
- JWKS endpoint allows verification of issued tokens

---

## 🧠 Design Decisions

- Keys are generated at server startup.
- Expired keys are retained internally but not exposed via JWKS.
- Only valid keys are returned from `/.well-known/jwks.json`.
- The `expired` query parameter simulates expired token issuance for testing.

---

## ⚠️ Educational Disclaimer

This project is intended for learning purposes only.

In a production environment, you would:

- Implement real authentication
- Add persistent key storage
- Implement automatic key rotation
- Use environment variables for configuration
- Apply production security best practices

---

## 👤 Author

Shailesh Yadav