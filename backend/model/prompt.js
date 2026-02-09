import mongoose from "mongoose";

const promptSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "assistant"],
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const prompt = mongoose.model("prompt", promptSchema);
export default prompt;
