import express from "express"
import { sendPrompt,getHistory } from "../../controllers/prompt/promptController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/prompt", authMiddleware, sendPrompt);
router.get("/history", authMiddleware, getHistory);


export default router;
