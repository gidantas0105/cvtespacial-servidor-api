const crypto = require("crypto");

const ALGORITHM = 'sha256';
const ENCRYPTION_KEY = 'CVT-Espacial&AEB&IFRN';

module.exports = senha => {
    let cipher = crypto.createHmac(ALGORITHM, ENCRYPTION_KEY);
    return cipher.update(senha).digest("hex");
}
