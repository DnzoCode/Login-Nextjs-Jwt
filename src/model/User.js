import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        trim: true,
    }
    
}, {
    timestamps: true
});

export default models.User || model('User', userSchema)
