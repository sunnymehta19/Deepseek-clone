import React, { useState, useRef, useEffect } from "react";
import { BadgeQuestionMark, LogOut, Settings, Smartphone, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../Store/slices/authSlice";
import DeepSeekLogo from "../../public/deepSeekLogo.svg";
import SidebarButton from "../../public/sidebarButton.svg";
import NewChat from "../../public/newChat.svg";
import ThreeDot from "../../public/threeDot.svg";


const Sidebar = ({ closeSidebar }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const { user, isAuthenticated } = useSelector((store) => store.auth);

    if (!user) return null;


    const handleLogout = async () => {
        try {
            const data = await dispatch(logOutUser()).unwrap();
            navigate("/login");

        } catch (error) {
            alert(error?.response?.data?.errors || "Logout Failed");
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div className="h-full flex flex-col justify-between p-3">
            {/* Header */}
            <div>
                <div className="flex py-2 px-1 justify-between items-center mb-4">
                    <div className="text-2xl font-bold ">
                        <img
                            src={DeepSeekLogo}
                            alt="deepseeklogo"
                            className="cursor-pointer"
                            onClick={() => navigate("/")}
                        />
                    </div>
                    <button onClick={closeSidebar}>
                        <img src={SidebarButton} alt="" className="cursor-pointer" />
                    </button>

                </div>

                {/* History */}
                <div className=" flex-1 overflow-y-auto px-1 mt-1  space-y-2">
                    <button className="  flex gap-1 items-center justify-center font-semibold w-full bg-[#43454a] text-[#f0f1f2] py-2 rounded-full mb-7 cursor-pointer shadow-sm">
                        <span className="">
                            <img src={NewChat} alt="" />
                        </span>
                        <span className="">New Chat</span>
                    </button>
                    <div className="scroll-area text-gray-500 text-sm overflow-y-scroll h-[70vh]">
                        {/* No chat history yet */}
                        <div className="hover:bg-[#353638] text-[#f0f1f2] rounded-xl h-10 flex items-center truncate px-2 cursor-pointer">
                            No chat history yet
                        </div>


                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className=" border-t border-gray-600">
                <div
                    ref={menuRef}
                    onClick={() => setIsMenuOpen(prev => !prev)}
                    className=" relative flex items-center justify-between px-2 hover:bg-[#29292b] rounded-xl mt-2 cursor-pointer"
                >
                    <div className="flex  items-center gap-2 cursor-pointer my-2 ">
                        <div className="bg-black text-white w-4 h-4 flex items-center justify-center p-4 font-extrabold rounded-full capitalize">
                            {user?.username[0]?.toUpperCase()}
                        </div>
                        <div className="text-gray-300 font-bold capitalize">
                            {user ? user.username : "My Profile"}
                        </div>
                    </div>
                    {isMenuOpen && (
                        <div className="absolute bottom-12 right-5 w-56 bg-[#2c2c2e] border border-[#3a3a3c] rounded-xl shadow-lg p-1 z-50 transition-all duration-200">

                            <button className="flex gap-2 items-center w-full text-left px-2 py-2 text-sm hover:bg-[#3a3a3c] rounded-lg cursor-pointer transition">
                                <span ><Smartphone size={20} /></span>
                                <span>Download mobile App</span>
                            </button>

                            <button className="flex gap-2 w-full text-left px-2 py-2 text-sm hover:bg-[#3a3a3c] rounded-lg cursor-pointer transition">
                                <span><Settings size={20} /></span>
                                <span>Settings</span>
                            </button>

                            <button className="flex gap-2 w-full text-left px-2 py-2 text-sm hover:bg-[#3a3a3c] rounded-lg cursor-pointer transition">
                                <span><BadgeQuestionMark size={20} /></span>
                                <span>Help & Feedback</span>
                            </button>

                            <button
                                onClick={handleLogout}
                                className="flex gap-2 w-full text-left px-2 py-2 text-sm hover:bg-[#3a3a3c] rounded-lg cursor-pointer transition "
                            >
                                <span><LogOut size={20} /></span>
                                <span>Log out</span>
                            </button>

                        </div>
                    )}

                    <div className="relative" ref={menuRef}>
                        <button onClick={() => setIsMenuOpen(prev => !prev)}>
                            <img src={ThreeDot} alt="menu" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Sidebar