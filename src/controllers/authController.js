const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password." });
    }
    
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid email or password." });
    }
    
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '8h' });
    
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: "Login failed. Try again." });
  }
};

const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
    await req.user.save();
    res.status(200).json({ message: "Logged out successfully." });
  } catch (err) {
    res.status(500).json({ error: "Logout failed. Try again." });
  }
};

module.exports = { login, logout };
