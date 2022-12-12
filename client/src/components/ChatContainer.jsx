import React, { useEffect, useState } from 'react'
import ChatInput from './ChatInput';
import Logout from './Logout';
import Messages from './Messages';
import axios from 'axios';
import { recieveMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';


function ChatContainer({ currentChat, currentUser }) {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post(recieveMessagesRoute, {
                from: currentUser._id,
                to: currentChat._id
            });
            setMessages(response.data);
        }
        fetchData();

    }, [currentChat]);

    console.log(messages);

    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        })
    }

    return (
        <div className="pt-4 h-full grid-chat-container overflow-hidden">
            {/* chat header */}
            <div className="flex justify-between items-center px-2">
                {/* user details */}
                <div className="flex items-center gap-4 ">
                    {/* avatar */}
                    <div>
                        <img className="h-12" src={`${currentChat?.avatarImage}.png`} />
                    </div>

                    {/* username */}
                    <div>
                        <h2 className="text-white font-bold">{currentChat?.username}</h2>
                    </div>
                </div>

                {/* logout */}
                <div className="text-xl bg-purple-400 p-1 rounded-md mr-4 cursor-pointer">
                    <Logout />
                </div>
            </div>


            <div className="h-[80%] flex flex-col gap-4 overflow-auto py-4 px-8">
                {
                    messages.map((msg, index) => (
                        <div key={index}>
                            <div className={`flex items-center rounded-lg  ${msg.fromSelf ? "justify-end" : "justify-start"} `}>
                                <div className={`max-w-[40%] break-words text-xl p-2 rounded-xl text-white${msg.fromSelf ? " bg-[#2d1c53]" : " bg-[#ffffff39]"} `}>
                                    <p>{msg.message}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* chat-input */}
            <ChatInput handleSendMsg={handleSendMsg} />
        </div>
    )
}

export default ChatContainer;