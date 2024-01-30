import mongoose from "mongoose";
const uploadSchema = new mongoose.Schema({
        pictureName: {
            type: String,
            required: true
        },
        path: String
}, {timestamps: true})

const uploadCollection = mongoose.model("upload", uploadSchema);
export default uploadCollection;