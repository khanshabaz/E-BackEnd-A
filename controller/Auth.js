const model = require("../model/User");
const User = model.User;

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  console.log(req.body);
  try {
    const doc = await user.save();
    res.status(201).json(doc);
  } catch (err) {
    console.error({ err });
    res.status(400).json(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    console.log(user)
    if (!user) {
      res.status(401).json({ message: "no such user email" });
    } else if (user.password === req.body.password) {
      console.log(user.password)
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.addresses,
      });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.error({ err });
    res.status(400).json(err);
  }
};
