import React, { useState, useEffect, useRef } from "react";
import { Paperclip, ArrowUp, Globe, Bot } from "lucide-react";
import logo from "../../public/favicon.png";
import DeepThinkLogo from "../../public/deepthink.svg";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as codeTheme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useDispatch, useSelector } from "react-redux";
import { sendPrompt } from "../Store/slices/chatSlice";
import { useNavigate } from "react-router-dom";
import SidebarButton from "../../public/sidebarButton.svg";
import NewChat from "../../public/newChat.svg";
import Whale from "../../public/whale.svg";

const Prompt = ({ openSidebar, isSidebarOpen }) => {

    const [inputValue, setInputValue] = useState("");
    const [typeMessage, setTypeMessage] = useState("");

    const dispatch = useDispatch();
    const { messages, loading } = useSelector((state) => state.chat);

    const promtEndRef = useRef();
    const navigate = useNavigate();

    const isDisabled = !inputValue.trim();


    useEffect(() => {
        promtEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const handleSend = () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;

        setInputValue("");
        setTypeMessage(trimmed);

        dispatch(sendPrompt(trimmed));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSend();
    };

    return (
        <div className="flex flex-col flex-1 w-full px-4 pt-10">

            {/* Greeting only when no messages */}
            {messages.length === 0 && (
                <div className="text-center mt-20">
                    <div className="flex items-center justify-center gap-2">
                        <img src={logo} alt="DeepSeek Logo" className="h-6 md:h-10" />
                        <h1 className="text-lg md:text-2xl font-bold text-white">
                            How can i help you?
                        </h1>
                    </div>
                </div>
            )}

            {/* Chat Area */}
            {/* <div className="w-full max-w-3xl mx-auto flex-1 overflow-y-auto mt-6 space-y-6 px-1 ">

                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`w-full flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        {msg.role === "assistant" ? (
                            <div className="w-fit  text-white rounded-2xl px-5 py-4 text-[15px] leading-7 whitespace-pre-wrap break-words">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        code({ inline, className, children, ...props }) {
                                            const match = /language-(\w+)/.exec(className || "");
                                            return !inline && match ? (
                                                <SyntaxHighlighter
                                                    style={codeTheme}
                                                    language={match[1]}
                                                    PreTag="div"
                                                    className="rounded-lg mt-2"
                                                    {...props}
                                                >
                                                    {String(children).replace(/\n$/, "")}
                                                </SyntaxHighlighter>
                                            ) : (
                                                <code className="bg-gray-800 px-1 py-0.5 rounded" {...props}>
                                                    {children}
                                                </code>
                                            );
                                        },
                                    }}
                                >
                                    {msg.content}
                                </ReactMarkdown>
                            </div>
                        ) : (
                            <div className="w-fit max-w-[80%] bg-[#2c2c2e] text-white rounded-full px-4 py-3 text-base whitespace-pre-wrap break-words">
                                {msg.content}
                            </div>
                        )}
                    </div>
                ))}

                {loading && typeMessage && (
                    <div className="w-fit max-w-[80%] bg-[#2c2c2e] text-white rounded-full px-4 py-3 text-base whitespace-pre-wrap break-words self-end ml-auto">
                        {typeMessage}
                    </div>
                )}

                {loading && (
                    <div className="flex justify-start w-full">
                        <div className="bg-[#2f2f2f] text-white px-4 py-3 rounded-xl text-sm animate-pulse">
                            🤖Loading...
                        </div>
                    </div>
                )}

                <div ref={promtEndRef} />
            </div> */}

            {/* Chat Area */}
            <div className="w-full max-w-3xl mx-auto flex-1 overflow-y-auto mt-6 px-2 pb-40">

                <div className="space-y-8">

                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"
                                }`}
                        >
                            {msg.role === "assistant" ? (
                                <div className=" text-[15px] leading-7 text-gray-200">

                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            h1: ({ children }) => (
                                                <h1 className="text-2xl font-semibold mt-6 mb-4">
                                                    {children}
                                                </h1>
                                            ),
                                            h2: ({ children }) => (
                                                <h2 className="text-xl font-semibold mt-6 mb-3">
                                                    {children}
                                                </h2>
                                            ),
                                            h3: ({ children }) => (
                                                <h3 className="text-lg font-semibold mt-5 mb-2">
                                                    {children}
                                                </h3>
                                            ),
                                            p: ({ children }) => (
                                                <p className="mb-4">
                                                    {children}
                                                </p>
                                            ),
                                            ul: ({ children }) => (
                                                <ul className="list-disc ml-6 mb-4 space-y-2">
                                                    {children}
                                                </ul>
                                            ),
                                            ol: ({ children }) => (
                                                <ol className="list-decimal ml-6 mb-4 space-y-2">
                                                    {children}
                                                </ol>
                                            ),
                                            hr: ({ ...props }) => (
                                                <hr
                                                    className="border-0 h-px bg-[#2a2a2a] my-6 opacity-60"
                                                    {...props}
                                                />
                                            ),
                                            code({ inline, className, children, ...props }) {
                                                const match = /language-(\w+)/.exec(className || "");
                                                return !inline && match ? (
                                                    <SyntaxHighlighter
                                                        style={codeTheme}
                                                        language={match[1]}
                                                        PreTag="div"
                                                        className="rounded-xl mt-4 text-sm"
                                                        {...props}
                                                    >
                                                        {String(children).replace(/\n$/, "")}
                                                    </SyntaxHighlighter>
                                                ) : (
                                                    <code className="bg-[#2c2c2e] px-1.5 py-0.5 rounded-full text-sm">
                                                        {children}
                                                    </code>
                                                );
                                            },
                                        }}
                                    >
                                        {msg.content}
                                    </ReactMarkdown>
                                </div>
                            ) : (
                                <div className="max-w-[80%] bg-[#2c2c2e] text-white rounded-full px-5 py-3 text-[15px] leading-6 break-words">
                                    {msg.content}
                                </div>
                            )}
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-[#2c2c2e] text-gray-300 px-5 py-3 rounded-2xl text-sm animate-pulse">
                                🤖 Thinking...
                            </div>
                        </div>
                    )}

                    <div ref={promtEndRef} />
                </div>
            </div>


            {/* Input Box */}
            <div className="w-full max-w-3xl mx-auto mt-auto pb-6 rounded-t-3xl sticky bottom-0 bg-[#151517]">
                <div className="bg-[#2c2c2e] rounded-3xl px-4 md:px-4 py-6 md:py-3 shadow-md">
                    <input
                        type="text"
                        placeholder="Message DeepSeek"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent w-full text-white placeholder-[#7e8289] text-base md:text-lg outline-none mb-2 md:mb-5 mt-1"
                    />

                    <div className="flex items-center justify-between mt-4 gap-4">
                        <div className="flex gap-2 flex-nowrap">
                            <button className="flex items-center gap-1 border border-[#464647] text-white text-[13px] font-bold px-3 py-0 rounded-full hover:bg-[#3d3d3e] transition cursor-pointer">
                                <img src={DeepThinkLogo} alt="deepthinkimage" className="w-4 h-4" />
                                <p>DeepThink</p>
                            </button>
                            <button className="flex items-center gap-1 border border-[#464647] text-white text-sm md:text-base px-3 py-1.5 rounded-full hover:bg-[#3d3d3e] transition cursor-pointer">
                                <Globe className="w-4 h-4" />
                                Search
                            </button>
                        </div>

                        <div className="flex items-center gap-4 ml-auto">
                            <button className="text-gray-400 hover:text-white transition">
                                <Paperclip className="w-5 h-5 cursor-pointer" />
                            </button>
                            <button
                                onClick={handleSend}
                                disabled={isDisabled}
                                className={`p-2 rounded-full text-white transition 
                                    ${isDisabled
                                        ? "bg-[#3b4f80] cursor-not-allowed opacity-50"
                                        : "bg-[#5686fe] hover:bg-[#5279db] cursor-pointer"
                                    }`}
                            >
                                <ArrowUp className="w-5 h-5" />
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            {!isSidebarOpen && (
                <button className="hidden lg:block fixed top-3 left-4 z-50 shadow-lg transition">
                    <div className="flex gap-2 items-center">
                        <img
                            src={Whale}
                            alt="DeepSeek"
                            onClick={() => navigate("/")}
                            className="w-9 h-9 cursor-pointer"
                        />
                        <div className="flex items-center gap-5 py-3 px-3 bg-[#2c2c2e] hover:bg-[#3a3a3c] rounded-full">
                            <img
                                src={SidebarButton}
                                onClick={openSidebar}
                                alt="Sidebar"
                                className="w-4 h-4 cursor-pointer"
                            />
                            <img
                                src={NewChat}
                                alt="New Chat"
                                className="w-4 h-4 cursor-pointer"
                            />
                        </div>
                    </div>
                </button>
            )}

        </div>
    );
};

export default Prompt;
