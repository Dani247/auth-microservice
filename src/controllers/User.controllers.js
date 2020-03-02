const { getHash } = require("../utils/hash");

class User {
  constructor(name, email, password, dateCreated) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.dateCreated = dateCreated || new Date();
  }
}

let userList = [];

const addUser = async user => {
  const { name, email, password } = user;
  const hashPassword = await getHash(password);

  const newUser = new User(name, email, hashPassword);
  userList = [...userList, newUser];
  console.log("new user", newUser);
  console.log("userList", userList);
  return newUser;
};

module.exports = {
  addUser
};
