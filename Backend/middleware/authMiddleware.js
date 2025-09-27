const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Grab token from header
  const token = req.header("Authorization")?.split(" ")[1]; // Bearer <token>
  console.log("Incoming Token:", token);

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded payload:", decoded); 
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
