const crypto = require('crypto');

class PasskeyService {
  constructor() {
    this.registeredKeys = {}; // userId: publicKey
  }

  generateChallenge(userId) {
    const challenge = crypto.randomBytes(32).toString('base64');
    this.registeredKeys[userId] = this.registeredKeys[userId] || {};
    this.registeredKeys[userId].challenge = challenge;
    return challenge;
  }

  registerPasskey(userId, publicKey) {
    this.registeredKeys[userId] = { ...this.registeredKeys[userId], publicKey };
    return true;
  }

  verifyPasskey(userId, signature) {
    const userKey = this.registeredKeys[userId];
    if (!userKey || !userKey.publicKey || !userKey.challenge) return false;

    const verify = crypto.createVerify('SHA256');
    verify.update(userKey.challenge);
    verify.end();

    const isValid = verify.verify(userKey.publicKey, signature, 'base64');
    if (isValid) delete userKey.challenge; // challenge used
    return isValid;
  }
}

module.exports = new PasskeyService();