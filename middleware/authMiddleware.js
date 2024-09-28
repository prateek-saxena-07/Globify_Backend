import jwt from 'jsonwebtoken';

//For Verifying Authentic token and Decoding
const authMiddleWare = (req, res, next) => {
    const token = req.header('Authorization');//Extracting the Token

    if (!token) return res.status(401).json({ message: 'Access denied ,No token Provided' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //Verifying Token with Secret key
        req.user = decoded;//Attach the decoded token to req.user for future middleware/functions
        next();
    }
    catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

export default authMiddleWare;