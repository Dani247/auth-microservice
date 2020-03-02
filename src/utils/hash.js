const bcrypt = require("bcrypt");

const getHash = async (password, iterations = 10) => {
  return new Promise(async (res, rej) => {
    try {
      const salt = await bcrypt.genSalt(iterations);
      const hash = await bcrypt.hash(password, salt);
      res(hash);
    } catch (err) {
      rej(err);
    }
  });
};

const compare = async (password, hash) => {
  return new Promise(async (res, rej) => {
    try {
      const result = await bcrypt.compare(password, hash);
      res(result);
    } catch (err) {
      rej(err);
    }
  });
};

module.exports = { getHash, compare };
