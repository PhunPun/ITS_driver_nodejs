import { User } from "../models/index.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import isEmail from "validator/lib/isEmail.js";

const login = async({
    email,
    password
}) => {
    let existingUser = await User.findOne({email}).exec()
    if (existingUser) {
        const isMatched = await bcrypt.compare(password, existingUser.password)
        if (isMatched === true) {
            // token
            let token = jwt.sign(
                {data: existingUser},
                process.env.JWT_SECRET,
                {expiresIn: '7d'}
            )
            return {
                ...existingUser.toObject(),
                password: "Not show",
                token: token
            } 
            
        }else{
            throw new Error('Wrong email or password')
        }
    }else{
        throw new Error('Wrong email or password')
    }
}
const register = async ({
    name,
    email,
    password,
    role
}) => {
    try {
        const existingUser = await User.findOne({email}).exec()
        if(!!existingUser) {
            throw new Error('User already exist')
        }
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        })
        return{
            ...newUser._doc,
            password: 'Not show'
        }
    } catch (Error) {
        throw new Error('Can not register')
    }
    console.log('register user in user repository: ' + name,+ ' ' + password)
}

export default {
    login,
    register
}