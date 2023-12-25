import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    }
});


const userModel = mongoose.Model('users', userSchema);
export default userModel;