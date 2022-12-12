import React, { useState, useEffect } from 'react';
import Picker from 'emoji-picker-react';
import { IoMdSend } from "react-icons/io";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { AiOutlineGif } from "react-icons/ai";

import "../index.css";

function ChatInput({ handleSendMsg }) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (event, emoji) => {
        let message = msg;
        message += emoji.emoji;
        setMsg(message);
    }

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg("");
            setShowEmojiPicker(!showEmojiPicker);
        }
    }

    return (
        <div className="flex items-center bg-[#3a3c41] px-1 pr-8">
            {/* button container */}
            <div className="flex items-center text-white pl-4">
                {/* emoji */}
                <div className="relative flex items-center">
                    <BsFillEmojiSmileFill className="text-lg text-[#ffff00c8] cursor-pointer" onClick={handleEmojiPickerHideShow} />
                    <div className="absolute -top-[350px]">
                        {showEmojiPicker && <Picker className="xxxx" onEmojiClick={handleEmojiClick} />}
                    </div>
                </div>
            </div>

            <div className="flex items-center text-white px-4">
                {/* emoji */}
                <div className="relative flex items-center">
                    <AiOutlineGif className="text-3xl text-[#ffff00c8] cursor-pointer" onClick={handleEmojiPickerHideShow} />
                </div>
            </div>



            {/* form */}
            <form onSubmit={(event) => sendChat(event)} className="items-center flex w-full rounded-2xl gap-2 bg-[#ffffff34] ml-4">
                <input className="items-center caret-pink-500 p-1 text-xl w-[90%] h-[60%] bg-transparent text-white pl-4 outline-none" type="text" placeholder="type your message here" onChange={(e) => setMsg(e.target.value)} value={msg} />
                <button type="submit" onClick={handleSendMsg} className="py-2 px-8 rounded-full cursor-pointer justify-center items-center bg-purple-400">
                    <IoMdSend className="text-xl text-white" />
                </button>
            </form>
        </div>
    )
}

export default ChatInput