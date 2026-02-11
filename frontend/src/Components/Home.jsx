import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';
import Prompt from './Prompt';
import NewChat from "../../public/newChat.svg";
import MenuBar from "../../public/menuBar.svg"

const Home = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <>
            <div className="flex min-h-screen bg-[#151517] text-white ">

                <div
                    className={`fixed top-0 left-0 h-full w-66 bg-[#1b1b1c] transition-transform duration-300 z-40
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
                </div>


                {/* Main content */}
                <div
                    className={`flex-1 flex flex-col w-full transition-all duration-300 min-h-0
                    ${isSidebarOpen ? "pl-[16.5rem]" : "pl-0"}`}
                >
                    <div className="md:hidden flex items-center justify-between p-6 ">
                        <button onClick={() => setIsSidebarOpen(true)} >
                            <img src={MenuBar} alt="Menu" className=" h-5 w-5" />
                        </button>
                        <button className="">
                            <img src={NewChat} alt="NewChat" className=" h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col px-2 sm:px-6 transition-all duration-300 min-h-0">

                        <Prompt openSidebar={() => setIsSidebarOpen(true)} isSidebarOpen={isSidebarOpen} />
                    </div>
                </div>

                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
            </div>
        </>
    )
}

export default Home