"use client";

import React, { useState, useEffect } from 'react';
import SidebarNew from "@/app/components/SidebarNew";
import { ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import slikamene from "@/public/BandWMoler.webp";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

interface worker {
    workerName: string,
    position: string,
    profilePicture: string,
    categories: string[]
}

const Page = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [workersCount, setWorkersCount] = useState<number>(0);
    const [workers, setWorkers] = useState<worker[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        async function getAllWorkers() {
            try {
                const response = await axios.get("/api/get-all-workers");
                setWorkers(response.data.workers);
                setCategories(response.data.workers.categories);
                setWorkersCount(response.data.workersCount);
                console.log(response.data.workers)
                console.log(categories)
            } catch (error) {}
        }
        getAllWorkers();
    }, []);

    function toggleMenu() {
        setIsActive(prevState => !prevState);
        setIsOpen(prevState => !prevState);
    }
    return (
        <section className="w-full min-h-screen relative flex flex-col">
            <section className='relative overflow-x-hidden w-full min-h-screen flex flex-col xl:flex-row'>
                <button onClick={toggleMenu}
                        className="fixed mt-7 right-5 z-33 w-10 h-10 flex items-center justify-center rounded-xl bg-transparent transition-all duration-200 border border-black/10 group lg:hidden xl:hidden 2xl:hidden"
                        aria-label="Toggle menu">
                    <div className="relative flex flex-col items-center justify-center w-5 h-5 overflow-hidden">
                        <span className={`absolute w-5 h-[2px] bg-black rounded-full transform transition-transform duration-300 ease-in-out ${isActive ? "rotate-45" : "-translate-y-1.5"}`}></span>
                        <span className={`absolute w-5 h-[2px] bg-black rounded-full transform transition-all duration-200 ease-in-out ${isActive ? "opacity-0" : "opacity-100"}`}></span>
                        <span className={`absolute w-5 h-[2px] bg-black rounded-full transform transition-transform duration-300 ease-in-out ${isActive ? "-rotate-45" : "translate-y-1.5"}`}></span>
                    </div>
                </button>
                <SidebarNew isOpen={isOpen}/>
                <div className={`flex-grow flex flex-col p-4 lg:mt-0 sm:mt-30 max-sm:mt-5 xl:mt-0 md:p-7 lg:pl-[230px] xl:pl-[320px] 2xl:pl-[320px] max-sm:pt-[120px] ${isOpen ? "hidden" : ""}`}>
                    <div className='w-full mb-8'>
                        <p className='flex items-center text-[#535d6d]'><span onClick={() => router.push("/")} className="hover:cursor-pointer">Početna</span><span><ChevronRight className='w-[20px] translate-y-[2px]'/></span><span className='bg-[#f3f4f6] pt-[1px] pb-[1px] pl-3 pr-3 rounded-xl text-[#586373]'>Zaposleni</span></p>
                        <div className='mt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                            <div className="flex-col">
                                <h2 className='text-2xl text-[#1b1b1a] font-bold'>Zaposleni ({workersCount})</h2>
                                <p className='text-md text-muted-foreground font-semibold'>Ovde će biti prikazani svi zaposleni</p>
                            </div>
                            <Button className="text-white pt-1 pb-1 pl-5 pr-5 rounded-full bg-black font-semibold cursor-pointer z-0" onClick={() => router.push("/zaposleni/kreiraj-zaposlenog")}><Plus/> Dodaj novog radnika</Button>
                        </div>
                    </div>
                    <main className="mt-20 justify-items-center grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] place-items-center gap-y-5 -gap-x-20">
                        {workers.map((worker, index) => (
                            <div key={index} className="relative w-[300px] h-[250px] rounded-xl shadow-md">
                                <div
                                    className="absolute top-5 left-5 w-[65px] border-gray-200 border-3 h-[65px] rounded-full bg-white flex items-center justify-center">
                                    <Image src={worker.profilePicture} alt={"radnik"} width={55} height={55} className="object-fit w-[55px] h-[55px] rounded-full"/>
                                </div>
                                <h1 className="mt-5 mx-25 w-full font-semibold text-black text-xl">{worker.workerName}</h1>
                                <p className="absolute top-14 left-26 text-muted-foreground text-md">{worker.position}</p>
                                <div
                                    className="flex flex-col xl:flex-row 2xl:flex-row absolute left-5 top-25 w-[90%] h-[50px]">
                                    <div className="h-1/2 flex gap-2 flex-wrap">
                                        {worker.categories.map((category, index) => (
                                            <Badge key={index} variant={"secondary"} className="pt-[5px] pb-[5px] pl-3 pr-3">
                                                {category}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <p className="absolute bottom-15 left-7 text-black font-semibold">Ukupno projekata: <span className="text-muted-foreground">120</span></p>
                            </div>
                        ))}
                    </main>
                </div>
            </section>
        </section>
    );
};

export default Page;