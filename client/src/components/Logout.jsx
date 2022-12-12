import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RiLogoutCircleRLine } from "react-icons/ri";

function Logout() {

    const navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.clear();
        navigate("/login")
    }

    return (
        <div className="cursor-pointer" onClick={handleLogout}>
            <RiLogoutCircleRLine className="text-white -rotate-90 cursor-pointer" />
        </div>
    )
}

export default Logout