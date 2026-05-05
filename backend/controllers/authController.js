const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');

const User = require('../models/User');

const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid Email' });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: 'Password not Strong enough' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User Already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({
      message: 'User Created Successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not exists' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect Password' });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET,
      { expiresIn: '5h' },
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signupUser, loginUser };
