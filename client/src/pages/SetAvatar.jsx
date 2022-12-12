import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Loader from "../assets/loader1.gif";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";

import "../index.css";

import 'react-toastify/dist/ReactToastify.css';
function setAvatar() {

    const api = "https://api.multiavatar.com";
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    };


    useEffect(() => {
        if (!localStorage.getItem("chat-app-user")) {
            navigate("/login");
        }
    }, [navigate]);

    const handleSelectAvatar = (index) => {
        console.log("Indexxxxxxx", index);
        setSelectedAvatar((prev) => prev = index);
        console.log("selectedAvatarrr", selectedAvatar)
    }

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.warning("Please select an avatar", toastOptions);
        } else {
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            console.log("user", user);
            // const data = await fetch(`${setAvatarRoute}/${user._id}`, {
            //     method: "POST",
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ image: avatars[selectedAvatar] })
            // });
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar]
            })

            console.log("data", data);

            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate("/");
                toast.success("Successfully 😊", toastOptions);
            } else {
                toast.error("Error setting avatar, please try again", toastOptions);
            }
        }
    };

    useEffect(() => {
        var data = [];
        const fetchData = async () => {
            for (let i = 0; i < 4; i++) {
                let avatarId = "Binx Bond"
                let resAva = await fetch('https://api.multiavatar.com/' + (Math.random() * 100).toString());
                if (resAva.ok) {
                    console.log("data", resAva.url.toString());
                    data.push(resAva.url.toString());
                }
            }
            setAvatars(data);
            setIsLoading(false);
        }

        fetchData();
    }, [])

    return (
        <div className='bg-[#ee9ca7]'>
            {isLoading ? 
            <div className="w-screen h-screen setava flex justify-center items-center flex-col gap-12">
                <img className='h-[660px] object-contain' src={Loader} alt="loader" />
            </div> :
                <div className="w-screen h-screen setava flex justify-center items-center flex-col gap-12">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Pick an avatar as your profile picture</h1>
                    </div>

                    <div className="flex gap-8">
                        {avatars && avatars.map((item, index) => (
                            <div key={index} className={`hover:scale-110 items-center justify-center flex transition rounded-full p-1 border-2 border-transparent border-solid ${selectedAvatar === index ? "selected" : ""}`}>
                                <img className="h-24" src={`${item}.png`} alt="avatar" onClick={() => handleSelectAvatar(index)} />
                            </div>
                        ))}
                    </div>

                    <button className="uppercase hover:bg-white bg-black font-black text-sm p-2 rounded-md text-slate-100 hover:text-black transition" onClick={setProfilePicture}>
                        Set as Profile picture
                    </button>
                </div>
            }
        </div>
    )
}

export default setAvatar;