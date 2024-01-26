"use client"

import BackButton from "./component/svg/backButton";
import ShowPassword from "./component/svg/showPassword";
import { useEffect, useState } from "react";
import Link from "next/link";
import { login, setAccessTokenLocalStorage } from "./component/auth/auth";

export default function Home() {

  const [inputEmail, setinputEmail] = useState<any>("");
  const [inputPassword, setinputPassword] = useState<any>("");
  const [disabledLogin, setdisabledLogin] = useState<any>(true);
  const [showingPass, setshowingPass] = useState<any>("password");

  const onLogin = async() => {
    try {
      const userData = {
        email: inputEmail,
        username: "",
        password: inputPassword
      }
      const data = await login(userData)
      setAccessTokenLocalStorage(data.access_token)
      window.location.href = '/initial';
    } catch (error) {
      console.log("error", error);
    }
  }

  const onShowPassword = () => {
    if (showingPass === "password") {
      setshowingPass('text');
    } else {
      setshowingPass('password')
    }
  }

  useEffect(() => {
    if (inputEmail.trim() !== '' && inputPassword.trim() !== '') {
      setdisabledLogin(false);
    } else {
      setdisabledLogin(true);
    }
  }, [inputEmail, inputPassword]);
  
  return (
    <main className="main-color w-full h-screen p-7 grid grid-rows-[auto_auto_auto] items-start">
      <div className="flex w-full items-center gap-3">
        <BackButton />
        <p className="text-white text-sm/[14px]">Back</p>
      </div>


      <div className="flex flex-col w-full">
        <div className="text-white">
          <h1 className="text-[24px] font-bold ml-4">Login</h1>
        </div>

        <div className="input-login w-full mt-[25px] mb-[15px]">
          <input type="email" name="login" id="login" placeholder="Enter Username/Email" 
            value={inputEmail}
            onChange={(e) => setinputEmail(e.target.value)}
            className="custom-bg h-[51px] rounded-[9px] w-full px-4 outline-none text-white"
          />
        </div>

        <div className="input-login  w-full mb-[25px] relative custom-bg rounded-[9px]">
          <input type={showingPass} name="password" id="password" placeholder="Enter password"
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

        <div className={!disabledLogin ? "bg-gradient-to-r from-teal-400 via-teal-500 to-blue-500 p-4 rounded-[8px] text-center" : "bg-gradient-to-r from-teal-400 via-teal-500 to-blue-500 p-4 rounded-[8px] text-center opacity-[0.4]"}>
          <button className="text-white " onClick={onLogin} disabled={disabledLogin}>Login</button>
        </div>

      </div>

      <div className="text-center">
        <h2 className="text-white">No account? &nbsp;
          <span className="text-white underline custom-text">
            <Link href={"/register"}>Register here</Link>
          </span>
        </h2>
      </div>
    </main>
  );
}
