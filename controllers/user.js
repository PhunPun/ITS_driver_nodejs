import {
    body,
    validationResult
} from 'express-validator'
import { UserReponsitory } from '../repositories/index.js'
import {EventEmitter} from 'node:events'

const myEvent = new EventEmitter() 
myEvent.on('event.register.user', (params) => {
    console.log(`they told about: ${JSON.stringify(params)}`)
})
const login = async (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }
    const {email, password} = req.body;
    try {
        let existingUser = await UserReponsitory.login({email, password})
        res.status(200).json({
            message: 'login user successfully',
            data: existingUser
        });
    }catch (exception) {
        res.status(500).json({
            message: exception.toString()
        })
    }
};
const register = async (req, res) => {
    const {
        name, 
        email,
        password,
        role
    } = req.body
    myEvent.emit('event.register.user', {name, email, password})
    try{
        const user = await UserReponsitory.register({
            name,
            email,
            password,
            role
        })
        res.status(201).json({
            message: 'Register user successfully',
            data: user
        });
    } catch (exception) {
        res.status(500).json({
            message: exception.toString()
        })
    }
}

const getDetailUser = async (req, res) => {
    res.status(200).json({
        message: 'Get detail user successfully'
    })
}

export default {
    login,
    register,
    getDetailUser
}