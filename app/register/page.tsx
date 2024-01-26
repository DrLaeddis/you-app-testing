"use client"

import Link from "next/link";
import BackButton from "../component/svg/backButton";
import { useEffect, useState } from "react";
import ShowPassword from "../component/svg/showPassword";
import { getAccessTokenLocalStorage, login, register, setAccessTokenLocalStorage } from "../component/auth/auth";

export default function Initial() {

    const [inputEmail, setinputEmail] = useState<any>("");
    const [inputUsername, setinputUsername] = useState<any>("");
    const [inputPassword, setinputPassword] = useState<any>("");
    const [inputConformPassword, setinputConformPassword] = useState<any>("");
    const [disabledLogin, setdisabledLogin] = useState<any>(true);
    const [showingPass, setshowingPass] = useState<any>("password");
    const [showingConPass, setshowingConPass] = useState<any>("password");


    useEffect(() => {
        if (inputEmail.trim() !== '' && inputPassword.trim() !== '' && inputUsername.trim() !== '' && inputConformPassword.trim() !== '') {
          setdisabledLogin(false);
        } else {
          setdisabledLogin(true);
        }
    }, [inputConformPassword, inputEmail, inputPassword, inputUsername]);

    const onRegister =async () => {
        try {
            const userData = {
                email: inputEmail,
                username: inputUsername,
                password: inputPassword,
                confirmPassword: inputConformPassword,
            };

            const data = await register(userData);
            await login({ email: inputEmail, username: "" ,password: inputPassword});
            // setAccessTokenLocalStorage(data.access_token);

            window.location.href = '/initial';

        } catch (error) {
            console.log(error);
        }
    }

    const onShowPassword = () => {
        if (showingPass === "password") {
          setshowingPass('text');
        } else {
          setshowingPass('password')
        }
    }

    const onShowConPassword = () => {
        if (showingConPass === "password") {
            setshowingConPass('text');
        } else {
            setshowingConPass('password')
        }
    }

    return (
        <main className="main-color w-full h-screen p-7 grid grid-rows-[auto_auto_auto] items-start">
            <div className="flex w-full items-center gap-3">
                <BackButton />
                <p className="text-white text-sm/[14px]">Back</p>
            </div>

            <div className="flex flex-col w-full">
                <div className="text-white">
                    <h1 className="text-[24px] font-bold ml-4">Register</h1>
                </div>

                <div className="input-login w-full mt-[25px] mb-[15px]">
                    <input type="email" name="login" id="login" placeholder="Enter Email" 
                        value={inputEmail}
                        onChange={(e) => setinputEmail(e.target.value)}
                        className="custom-bg h-[51px] rounded-[9px] w-full px-4 outline-none text-white"
                    />
                </div>

                <div className="input-login w-full mb-[15px]">
                    <input type="text" name="login" id="login-username" placeholder="Create Username" 
                        value={inputUsername}
                        onChange={(e) => setinputUsername(e.target.value)}
                        className="custom-bg h-[51px] rounded-[9px] w-full px-4 outline-none text-white"
                    />
                </div>

                <div className="input-login custom-bg  w-full mb-[15px] relative">
                    <input type={showingPass} name="password" id="password" placeholder="Create password"
                        value={inputPassword}
                        onChange={(e) => setinputPassword(e.target.value)}
                        className="bg-transparent h-[51px] rounded-[9px] w-[90%] px-4 outline-none text-white"
                    />
                    <div className="absolute top-0 right-0 h-full flex items-center justify-center z-[14] mr-4"
                        onClick={onShowPassword}
                    >
                        <ShowPassword />
                    </div>
                </div>

                <div className="input-login custom-bg  w-full mb-[25px] relative">
                    <input type={showingConPass} name="password" id="confirm-password" placeholder="Confirm password"
                        value={inputConformPassword}
                        onChange={(e) => setinputConformPassword(e.target.value)}
                        className="bg-transparent h-[51px] rounded-[9px] w-[90%] px-4 outline-none text-white"
                    />
                    <div className="absolute top-0 right-0 h-full flex items-center justify-center z-[14] mr-4"
                        onClick={onShowConPassword}
                    >
                        <ShowPassword />
                    </div>
                </div>

                <div className={!disabledLogin ? "bg-gradient-to-r from-teal-400 via-teal-500 to-blue-500 p-4 rounded-[8px] text-center" : "bg-gradient-to-r from-teal-400 via-teal-500 to-blue-500 p-4 rounded-[8px] text-center opacity-[0.4]"}>
                    <button className="text-white " onClick={onRegister} disabled={disabledLogin}>Register</button>
                </div>

            </div>

            <div className="text-center">
                <h2 className="text-white">Have an account? &nbsp;
                <span className="text-white underline custom-text">
                    <Link href={"/"}>Login here</Link>
                </span>
                </h2>
            </div>
        </main>
    )
}