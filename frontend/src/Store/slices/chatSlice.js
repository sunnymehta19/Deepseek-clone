import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    messages: [],
    loading: false,
    error: null,
}

export const fetchChats = createAsyncThunk(
    "chat/history",
    async () => {
        const { data } = await axios.get(
            "http://localhost:3000/api/deepseek/history",
            { withCredentials: true }
        );
        return data.chats;
    });


export const sendPrompt = createAsyncThunk(
    "chat/sendPrompt",
    async (content) => {
        const { data } = await axios.post(
            "http://localhost:3000/api/deepseek/prompt",
            { content },
            { withCredentials: true }
        );
        return {
            userMessage: { role: "user", content },
            assistantMessage: { role: "assistant", content: data.reply },
        };

    }
);

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        clearChat: (state) => {
            state.messages = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChats.fulfilled, (state, action) => {
                state.messages = action.payload;
            })
            .addCase(sendPrompt.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendPrompt.fulfilled, (state, action) => {
                state.loading = false;
                state.messages.push(action.payload.userMessage);
                state.messages.push(action.payload.assistantMessage);
            })
            .addCase(sendPrompt.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearChat  } = chatSlice.actions;
export default chatSlice.reducer;
