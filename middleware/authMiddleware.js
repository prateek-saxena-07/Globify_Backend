import jwt from 'jsonwebtoken';


const authMiddleWare = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied ,No token Provided' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

export default authMiddleWare;