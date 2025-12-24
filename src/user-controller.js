const User = require("./user-schema");

const getUser = async (req, res) => {
  const params = req.params;
  let users;
  if (params.id) {
    users = await User.findById(params.id);
  } else {
    users = await User.find();
  }
  if (params.id) {
    return res.send(users.filter((user) => user.id == params.id));
  }
  res.send(users);
};

const createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.send(user);
};

module.exports = {
  getUser,
  createUser,
};
