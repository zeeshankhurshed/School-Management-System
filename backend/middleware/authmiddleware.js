import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { asyncHandler } from './asyncHandler.js';

// Middleware to authenticate the user using JWT
const authenticate = asyncHandler(async (req, res, next) => {
    let token = req.cookies?.jwt; // Ensure safe access to cookies

    if (token) {
        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find user by decoded user ID and exclude password from the result
            req.user = await User.findById(decoded.userId).select('-password');
            if (!req.user) {
                res.status(401);
                throw new Error('User not found');
            }

            next(); // Proceed to the next middleware
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token verification failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

// Middleware to authorize admin access
const authorized = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); // Proceed to the next middleware
    } else {
        res.status(403).send('Not authorized as an admin');
    }
};

export { authenticate, authorized };
