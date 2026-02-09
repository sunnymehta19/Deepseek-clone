import OpenAI from "openai";
import promptModel from "../../model/prompt.js"

const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "DeepSeek Clone",
    },
});
const sendPrompt = async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.user._id;

        if (!content || content.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Prompt is required",
            });
        }

        await promptModel.create({
            userId,
            role: "user",
            content,
        });


        const completion = await openai.chat.completions.create({
            model: "deepseek/deepseek-chat",
            messages: [{ role: "user", content: content }],
        });

        const aiContent = completion.choices[0].message.content;

        const aiMessage = await promptModel.create({
            userId,
            role: "assistant",
            content: aiContent,
        });

        return res.status(200).json({
            success: true,
            reply: aiContent,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured while sending prompt."
        })
    }
}

const getHistory = async (req, res) => {
    try {
        const chats = await promptModel
            .find({ userId: req.userId })
            .sort({ createdAt: 1 });

        res.status(200).json({
            success: true,
            message: "Got chat history",
            chats
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch history"
        })
    }
};



export { sendPrompt, getHistory };