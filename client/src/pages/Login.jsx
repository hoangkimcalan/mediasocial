import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

import Logo from "../assets/logo.png";
import 'react-toastify/dist/ReactToastify.css';
import { loginRoute } from '../utils/APIRoutes';


function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: ""
    })

    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    };

    // useEffect(() => {
    //     if (localStorage.getItem("chat-app-user")) {
    //         navigate("/setAvatar");
    //     }
    // }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { password, username } = values;
            const { data } = await axios.post(loginRoute, {
                username,
                password,
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }

            if (data.status === true) {
                localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                toast.success("Login successfully", toastOptions);
                navigate("/setAvatar");
            }
        }
    }

    const handleValidation = () => {
        const { username, password } = values;

        if (password === "" || username === "") {
            toast.warning("Username and password is required", toastOptions);
            return false;
        }
        return true;
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    return (
        <>
            <div className="w-screen h-screen gap-4 flex justify-center items-center bg-signin">
                <div className="flex flex-col sign w-[450px] h-[380px] rounded-lg px-16 py-6 bg-pink-200 drop-shadow-md">
                    <div className="flex gap-4 items-center justify-center">
                        <img src={Logo} alt="" className="h-16" />
                        <h1 className="font-bold text-lg uppercase text-slate-800">Qqchat</h1>
                    </div>

                    <form onSubmit={(event) => handleSubmit(event)} className=" flex flex-col gap-8 justify-center mt-4">
                        <input className="bg-slate-50 p-1 border-sky-300 border-2 rounded-md w-full font-md focus:border-sky-500 focus:outline-none" type="text" placeholder="Username" name="username" onChange={e => handleChange(e)} min="6" />
                        <input className="bg-slate-50 p-1 border-sky-300 border-2 rounded-md w-full font-md focus:border-sky-500 focus:outline-none" type="password" placeholder="Password" name="password" onChange={e => handleChange(e)} />
                        <button className="bg-pink-400 z-10 create-button uppercase font-black text-sm p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-pink-600 transition" type="submit">
                            Login
                        </button>
                    </form>
                    <span className="mt-2 text-xs text-center uppercase font-semibold">Don't have an account ? <Link className="text-red-500 font-black hover:text-red-600" to="/register">Register</Link></span>
                </div>
            </div>

        </>
    )
}

export default Login;