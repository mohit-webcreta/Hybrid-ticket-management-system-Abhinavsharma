const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Update with the correct path to your User model

// Secret key for JWT (keep this secure and move to .env in production)
const JWT_SECRET = "your_jwt_secret_key";

// Utility function to hash passwords using crypto
const hashPassword = (password, salt) => {
  return crypto.createHmac("sha256", salt).update(password).digest("hex");
};

// Utility function to generate a random salt
const generateSalt = () => {
  return crypto.randomBytes(16).toString("hex");
};

// User Registration
const registerUser = async (req, res) => {
    const { name, email, password, confirmPassword, phone } = req.body;
  
    try {
      // Ensure passwords match
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email." });
      }
  
      // Generate salt
      const salt = generateSalt();
  
      // Hash the password with the salt
      const hashedPassword = hashPassword(password, salt);
  
      // Save the new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        salt, // Save the salt for password verification
        phone,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully", userId: newUser.userId });
    } catch (error) {
      res.status(500).json({ message: "Registration failed", error: error.message });
    }
  };
  

// User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the provided password with the user's stored salt
    const hashedPassword = hashPassword(password, user.salt);

    // Validate password
    if (hashedPassword !== user.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.userId, email: user.email }, JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.userId,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

module.exports = { registerUser, loginUser };
