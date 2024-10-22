const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]; // Corrected header access
        const token = authHeader && authHeader.split(" ")[1]; // Get token from 'Bearer <token>'

        // Check if token is missing
        if (token ==  null) {
            return res.status(401).json({ message: "Authentication token required" });
        }

        // Verify the token
        jwt.verify(token, "tcmTM", (err, user) => {
            if (err) {
                console.log(err);
                return res.status(403).json({ message: "Invalid or expired token" }); // Handle verification errors
            }

            req.user = user; // Store the decoded user in request object
            next(); // Proceed to the next middleware or route handler
    });
};

module.exports = { authenticateToken };
