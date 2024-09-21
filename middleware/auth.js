import jwt from 'jsonwebtoken'
import tokenValue from '../utils/codeToken.js';

export const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const token_decoded = jwt.verify(token, tokenValue);
        req.auth = {userId: token_decoded._id};
        next();
    } catch (err) {
        console.log('une erreur est survenue avec le token !!', err);
        res.status(400).json({ message: 'erreur au niveau du token', error: err.message });
    }
};