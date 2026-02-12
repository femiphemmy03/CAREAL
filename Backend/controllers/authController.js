// backend/controllers/authController.js
export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // This is where you talk to MongoDB/SQL
        console.log("Signup data received:", req.body);
        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const login = async (req, res) => {
    // Login logic here
};