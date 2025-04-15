import { validate } from "email-validator";
import mongoose, {Schema, ObjectId} from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const User = mongoose.model('User', 
    new Schema({
        id: {type: ObjectId},
        name: {
            type: String,
            require: true,
            validate: {
                validator: (value) => value.length > 3,
                message: 'Username must be at least 3 characters'
            }
        },
        email: {
            type: String,
            require: true,
            unique: true,
            validate: {
                validator: (value) => isEmail(value),
                message: 'Email is incorrect format'
            }
        },
        password: {
            type: String,
            require: true,
            validate: {
                validator: (value) => value.length > 5,
                message: 'password must be at least 5 characters'
            }
        },
        role: {
            type: String,
            enum: {
                values: ["Admin", "Customer"],
                message: '{VALUE} is not supprted'
            },
            require: true,
            default: "Customer"
        },
    })
)

export default User