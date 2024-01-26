"use client"

import { useEffect, useState } from "react";
import BackButton from "../component/svg/backButton"
import { getAccessTokenLocalStorage, getProfile, updateProfile } from "../component/auth/auth";

export default function EditInterest() {

    const [tags, setTags] = useState<any>([]);
    const [tagInput, setTagInput] = useState<any>('');
    const [profileData, setprofileData] = useState<any>({
        interests: []
    });

    useEffect(() => {
        const accessToken = getAccessTokenLocalStorage();
        
        const fetchData =async () => {
            try {
                const data = await getProfile(accessToken);
                console.log(data);
                setprofileData({
                    interests: data.data.interests || []
                });
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        setTagInput(profileData.interests.join(', '));
        setTags(profileData.interests);
    }, [profileData.interests]);

    const handleTagInput = () => {
        const tagArray = tagInput
        .split(/[,]+/) 
        .filter((tag:any) => tag.trim() !== '');

        setTags((prevTags:any) => Array.from(new Set([...prevTags, ...tagArray])));
    };
    
    const handleTagInputChange = (event: any) => {
        const inputText = event.target.value;
        setTagInput(inputText);
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter((tag:any) => tag !== tagToRemove));
    };

    const displayTags = tags.map((tag:any, index:any) => (
        <span
          key={index}
          className="inline-block bg-gray-200 text-gray-800 px-3 py-1 m-1 rounded-full"
        >
          {tag}
          <button
            onClick={() => handleRemoveTag(tag)}
            className="ml-1 text-red-500"
          >
            X
          </button>
        </span>
      ));

    const onBack = () => {
        window.location.href = '/initial'
    }

    const onSave = async () => {
        const accessToken = getAccessTokenLocalStorage();

        try {
            const userData = {
                interests: tags
            }
            const data = await updateProfile(userData, accessToken);
            console.log(data);
        } catch (error) {
            throw error;
        }

        window.location.href ='/initial'
    }



    return (
    <div className="custom-interest h-screen p-6">
        <div className="w-full flex justify-between items-center ">
            <div className="flex items-center gap-3" onClick={onBack}>
                <BackButton />
                <p className="text-white text-sm/[14px]">Back</p>
            </div>

            <div className="flex justify-end" onClick={onSave}>
                <p className="custom-save">Save</p>
            </div>
        </div>

        <div className="mt-24">
            <div className="">
                <p className="custom-intro">Tell everyone about yourself</p>
                <h2 className="text-white mt-5">What interest you?</h2>
            </div>

            <div className="mt-10">
                <div className="mt-2">
                {displayTags}
                </div>
                <div className="">
                    <input
                        type="text"
                        value={tagInput}
                        onChange={handleTagInputChange}
                        onBlur={handleTagInput}
                        className="w-full px-3 py-2 text-white custom-input-interest-list outline-none "
                    />
                </div>
            </div>
            
        </div>
    </div>
    )
}