const crypto = require('crypto');

// // Generate Alice's keys...
// const alice = crypto.createDiffieHellman(1024);
// const aliceKey = alice.generateKeys();

// crypto.
// console.log("alice key generated:", aliceKey);

// // Generate Bob's keys...
// const bob = crypto.createDiffieHellman(alice.getPrime(), alice.getGenerator());
// const bobKey = bob.generateKeys();
// console.log("bob key generated:", bobKey);

// // Exchange and generate the secret...
// const aliceSecret = alice.computeSecret(bobKey);
// const bobSecret = bob.computeSecret(aliceKey);

// // OK
// console.log(aliceSecret.toString('hex'));
// console.log(bobSecret.toString('hex'));


// Generate Alice's keys...
const alice = crypto.createECDH('secp521r1');
const aliceKey = alice.generateKeys();

// Generate Bob's keys...
const bob = crypto.createECDH('secp521r1');
const bobKey = bob.generateKeys();

// Exchange and generate the secret...
const aliceSecret = alice.computeSecret(bobKey);
const bobSecret = bob.computeSecret(aliceKey);

//assert.strictEqual(aliceSecret.toString('hex'), bobSecret.toString('hex'));
// OK
console.log(aliceSecret.toString('hex'));
console.log(bobSecret.toString('hex'));