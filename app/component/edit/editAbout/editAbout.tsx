"use client"

import { useEffect, useRef, useState } from "react";
import AddImage from "../../svg/addImage";
import Image from "next/image"
import { createProfile, getAccessTokenLocalStorage, getProfile } from "../../auth/auth";

export default function EditAbout(props:any) {

    const { handleToggleForm } = props;
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [entername, setentername] = useState<any>();
    const [date, setdate] = useState<any>('');
    const [zodiac, setzodiac] = useState<any>();
    const [horoscope, sethoroscope] = useState<any>();
    const [enterheight, setenterheight] = useState<any>();
    const [enterweight, setenterweight] = useState<any>();
    const [gender, setgender] = useState<any>();
    const [selectedImage, setselectedImage] = useState<any>(null);
    
    const onEdit = async () => {
        const accessToken = getAccessTokenLocalStorage();
        try {
            const userData = {
                name: entername,
                gender: gender,
                birthday: date,
                height: parseFloat(enterheight),
                weight: parseFloat(enterweight),
                interests: [],
            }
            const data = await createProfile(userData,accessToken);

        } catch (error) {
            throw error;
        }
        // handleToggleForm(1)
        window.location.reload();
    }

    useEffect(() => {
        const accessToken = getAccessTokenLocalStorage();
        
        const fetchData =async () => {
            try {
                const data = await getProfile(accessToken);
                console.log(data);
                setentername(data.data.name);
                setgender(data.data.gender);
                setdate(data.data.birthday);
                setenterheight(data.data.height);
                setenterweight(data.data.weight);
                sethoroscope(data.data.horoscope);
                setzodiac(data.data.zodiac);
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, []);

    const handleAddImageClick = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    };

    const handleImageChange = (event:any) => {
        const file = event.target.files[0];
    
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setselectedImage(imageUrl);
        }
    };

    const handleDateChange = (event:any) => {
        const selectedEvnet = event.target.value;
        setdate(selectedEvnet);

        calculateHoroscopeAndZodiac(selectedEvnet)
    }

    const calculateHoroscopeAndZodiac = (date:any) => {
        const currentYear = new Date().getFullYear();
      
        const zodiacData = [
          { sign: 'Aries', symbol: 'Ram', start: `${currentYear}-03-21`, end: `${currentYear}-04-19` },
          { sign: 'Taurus', symbol: 'Bull', start: `${currentYear}-04-20`, end: `${currentYear}-05-20` },
          { sign: 'Gemini', symbol: 'Twins', start: `${currentYear}-05-21`, end: `${currentYear}-06-21` },
          { sign: 'Cancer', symbol: 'Crab', start: `${currentYear}-06-22`, end: `${currentYear}-07-22` },
          { sign: 'Leo', symbol: 'Lion', start: `${currentYear}-07-23`, end: `${currentYear}-08-22` },
          { sign: 'Virgo', symbol: 'Virgin', start: `${currentYear}-08-23`, end: `${currentYear}-09-22` },
          { sign: 'Libra', symbol: 'Balance', start: `${currentYear}-09-23`, end: `${currentYear}-10-23` },
          { sign: 'Scorpius', symbol: 'Scorpion', start: `${currentYear}-10-24`, end: `${currentYear}-11-21` },
          { sign: 'Sagittarius', symbol: 'Archer', start: `${currentYear}-11-22`, end: `${currentYear}-12-21` },
          { sign: 'Capricornus', symbol: 'Goat', start: `${currentYear - 1}-12-22`, end: `${currentYear}-01-19` },
          { sign: 'Aquarius', symbol: 'Water Bearer', start: `${currentYear}-01-20`, end: `${currentYear}-02-18` },
          { sign: 'Pisces', symbol: 'Fish', start: `${currentYear}-02-19`, end: `${currentYear}-03-20` },
          // Tambahkan data zodiak lainnya
        ];
      
        const selectedZodiac = zodiacData.find((zodiac) => date >= zodiac.start && date <= zodiac.end);
      
        if (selectedZodiac) {
            sethoroscope(selectedZodiac.sign);
            setzodiac(selectedZodiac.symbol);
        }
        // Tambahkan logika untuk rentang tanggal lainnya
    };

    const handleGenderChange = (event:any) => {
        const selectedGender = event.target.value;
        console.log(selectedGender);
        
        setgender(selectedGender);
      };
      

    return (
        <div className="relative bg-[#0E191F] h-[auto] w-full rounded-[14px] p-3">
        <div className="flex items-center justify-between" >
            <h2 className="text-white text-[14px] ml-4">About</h2>
            <button className="custom-text-about" onClick={onEdit}>Save & Update</button>
        </div>

        <div className="mt-4">
            <input
                className="hidden" 
                type="file" 
                name="" 
                id="" 
                ref={inputFileRef}
                onChange={handleImageChange}
                accept=".jpg, .jpeg, .png"
            />
            <div className="add-image flex items-center gap-4">
                <div className="relative overflow-hidden rounded-[17px] w-[57px] h-[57px] image-place" onClick={handleAddImageClick}>
                    {selectedImage ? <Image layout="fill" alt="Selected Image" src={selectedImage} />
                        :
                        <div className="w-[57px] h-[57px]">
                            <AddImage />
                        </div>
                    }
                </div>
                <p className="text-[12px] text-white ">Add image</p>
            </div>
        </div>

        <div className="flex flex-col gap-4 mt-4">
            <div className="flex justify-between items-center">
                <p className="text-white">Display name:</p>
                <input 
                    type="text" 
                    placeholder="Enter name"
                    value={entername}
                    onChange={(e) => setentername(e.target.value)} 
                    className="w-[60%] outline-none text-end custom-input-about text-white px-2 py-3 rounded-[8px]" />
            </div>

            <div className="flex justify-between items-center">
                <p className="text-white">Gender:</p>
                <select value={gender} onChange={handleGenderChange} name="" id="" className="w-[60%] outline-none text-end custom-input-about text-white px-2 py-3 rounded-[8px]">
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                </select>
            </div>

            <div className="flex justify-between items-center">
                <p className="text-white">Birthday:</p>
                <input 
                    type="date" 
                    className="w-[60%] outline-none text-end custom-input-about text-white px-2 py-3 rounded-[8px]" 
                    value={date}
                    onChange={handleDateChange}
                />
            </div>

            <div className="flex justify-between items-center">
                <p className="text-white">Horoscope:</p>
                <input value={horoscope} type="text" name="" id="" placeholder="--" disabled className="w-[60%] outline-none text-end custom-input-about text-white px-2 py-3 rounded-[8px]" />
            </div>

            <div className="flex justify-between items-center">
                <p className="text-white">Zodiac:</p>
                <input value={zodiac} type="text" name="" id="" placeholder="--" disabled className="w-[60%] outline-none text-end custom-input-about text-white px-2 py-3 rounded-[8px]" />
            </div>

            <div className="flex justify-between items-center">
                <p className="text-white">Height:</p>
                <input 
                    type="text" 
                    placeholder="Add height" 
                    value={enterheight}
                    onChange={(e) => setenterheight(e.target.value)}
                    className="w-[60%] outline-none text-end custom-input-about text-white px-2 py-3 rounded-[8px]" />
            </div>

            <div className="flex justify-between items-center">
                <p className="text-white">Weight:</p>
                <input 
                    type="text" 
                    placeholder="Add weight" 
                    value={enterweight}
                    onChange={(e) => setenterweight(e.target.value)}
                    className="w-[60%] outline-none text-end custom-input-about text-white px-2 py-3 rounded-[8px]" />
            </div>
        </div>
    </div>
    )
}