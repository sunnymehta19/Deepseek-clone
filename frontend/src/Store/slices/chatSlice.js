import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchChats = createAsyncThunk(
    "chat/history",
    async () => {
        const { data } = await axios.get(
            "http://localhost:3000/api/deepseek/history",
            { withCredentials: true } 
        );
        return data.chats;
    });

const chatSlice = createSlice({
    name: "chat",
    initialState: { messages: [] },
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChats.fulfilled, (state, action) => {
            state.messages = action.payload;
        });
    },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
