"use client"

import Image from "next/image"
import BackButton from "../component/svg/backButton"
import EditButton from "../component/svg/editButton"
import ThreeDots from "../component/svg/threeDots"
import DummyImage from "../images/185-800x600.jpg"
import { useEffect, useState } from "react"
import { getAccessTokenLocalStorage, getProfile } from "../component/auth/auth"
import EditAbout from "../component/edit/editAbout/editAbout"

export default function Initial() {

    const [profileData, setprofileData] = useState<any>({
        email: '',
        username: '',
        interests: []
    });
    const [completeProfileData, setcompleteProfileData] = useState<any>([]);
    const [handleForm, sethandleForm] = useState<number>(1);

    useEffect(() => {
        const accessToken = getAccessTokenLocalStorage();
        
        const fetchData =async () => {
            try {
                const data = await getProfile(accessToken);
                console.log(data);
                setprofileData({
                    email: data.data.email,
                    username: data.data.username,
                    name: data.data.name,
                    gender: data.data.gender,
                    birthday: data.data.birthday,
                    horoscope: data.data.horoscope,
                    zodiac: data.data.zodiac,
                    height: data.data.height,
                    weight: data.data.weight,
                    interests: data.data.interests || []
                });
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, []);

    const onEdit = (value:any) => {
        sethandleForm(value)
    }

    const onInterest = () => {
        window.location.href = '/editInterest'
    }

    const displayTags = profileData.interests.map((tag:any, index:any) => (
        <span
          key={index}
          className="inline-block bg-gray-200 text-gray-800 px-3 py-1 m-1 rounded-full"
        >
          {tag}
        </span>
      ));

    return (
        <div className={handleForm === 1 ? "main-color w-full h-screen p-3 flex flex-col items-start gap-4" : "main-color w-full h-auto p-3 flex flex-col items-start gap-4"}>
            <div className="w-full flex justify-between items-center mt-[1rem]">
                <div className="flex items-center gap-3">
                    <BackButton />
                    <p className="text-white text-sm/[14px]">Back</p>
                </div>

                <div className="flex justify-center">
                    <h1 className="text-white">@{profileData.username}</h1>
                </div>

                <div className="flex justify-end">
                    <ThreeDots />
                </div>
            </div>

            <div className="relative bg-[#162329] h-[190px] w-full rounded-[16px] overflow-hidden">
                <Image
                    className="absolute"
                    src={DummyImage}
                    layout="fill"
                    alt="Profile Picture"
                />

                <div className="flex flex-col justify-end h-full p-3 relative z-10">
                    {/* <div className="flex justify-end">
                        <EditButton />
                    </div> */}

                    <div className="flex flex-col gap-2">
                        <h2 className="text-white">@{profileData.username}</h2>
                        {
                            profileData.gender &&
                            <p className="text-white text-[13px]">{profileData.gender}</p>
                        }

                        {
                            profileData.birthday &&
                            <div className="flex gap-4">
                                <div className="text-white custom-field-about">{profileData.horoscope}</div>
                                <div className="text-white custom-field-about">{profileData.zodiac}</div>
                            </div>
                        }
                    </div>
                </div>
          
            </div>

            {handleForm === 1 ? 
                <div className="relative bg-[#0E191F] h-[auto] w-full rounded-[14px] p-3">
                    <>
                        <div className="flex items-center justify-between" onClick={onEdit}>
                            <h2 className="text-white text-[14px] ml-4">About</h2>
                            <EditButton />
                        </div>

                        <div className="flex h-full items-center">
                            {profileData.birthday === "" ?
                            <p className="custom-color-init ml-4 w-[90%]">Add in your your to help others know you better</p>
                            :
                            <div className="flex flex-col gap-[15px]">
                                <div className="">
                                    <p className="custom-about-font">Birthday: <span className="text-white">{profileData.birthday}</span> </p>
                                </div>
                                <div className="">
                                    <p className="custom-about-font">Horoscope: <span className="text-white">{profileData.horoscope}</span></p>
                                </div>
                                <div className="">
                                    <p className="custom-about-font">Zodiac: <span className="text-white">{profileData.zodiac}</span></p>
                                </div>
                                <div className="">
                                    <p className="custom-about-font">Height: <span className="text-white">{profileData.height} cm</span></p>
                                </div>
                                <div className="">
                                    <p className="custom-about-font">Weight: <span className="text-white">{profileData.weight} kg</span></p>
                                </div>
                            </div>
                            }
                        </div>
                    </>
                </div>
                :
                <EditAbout
                    handleToggleForm={onEdit}
                />
            }
            
            <div className="relative bg-[#0E191F] h-[120px] w-full rounded-[14px] p-3">
                <div className="flex items-center justify-between">
                    <h2 className="text-white text-[14px] ml-4">Interest</h2>
                    <div className="" onClick={onInterest}>
                    <EditButton />
                    </div>
                </div>

                <div className="flex h-full items-center">
                    {profileData.interest === "" ?    
                        <p className="custom-color-init ml-4 w-[90%]">Add in your interest to find a better match</p> :
                        <span className="text-white">{displayTags}</span>
                    }
                </div>
            </div>
        </div>
    )
}