const { registerUserService, loginUserService } = require("../services/user.service");
const { registerSchema, loginSchema } = require("../validator/user.validation");

exports.registerUser = async (req, res) => {
  try {
    // Validate input
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // Call service
    const { user, token } = await registerUserService(req.body);
    res.status(201).json({ message: "User registered successfully", token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    // Validate input
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // Call service
    const { user, token } = await loginUserService(req.body);
    res.status(200).json({ message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
