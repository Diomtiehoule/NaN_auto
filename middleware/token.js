import jwt from 'jsonwebtoken'
import tokenValue from '../utils/codeToken.js'

export const generateToken = (user) =>{
    const tokenSecret = tokenValue
    if(!tokenSecret) throw new Error ('token introuvable')
    return jwt.sign(user , tokenSecret , {expiresIn : 24*3600})
}

export const verifyToken = (token) =>{
    const tokenSecret = tokenValue
    if(!tokenSecret) throw new Error ('token introuvable')
    return jwt.verify(token , tokenSecret)
}