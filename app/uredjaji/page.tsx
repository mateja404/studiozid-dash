"use client";

import React, { useState, useEffect } from 'react';
import toast, { Toaster } from "react-hot-toast";
import SidebarNew from "@/app/components/SidebarNew";
import {ChevronRight, ShieldX, TabletSmartphone, Monitor, Earth, Chrome, ShieldCheck, ShieldUser} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AlertDialogHeader, AlertDialogFooter, AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import Image from "next/image";
import androidsvg from "@/public/android.svg";
import applesvg from "@/public/apple.svg";
import { Tooltip,  TooltipContent,  TooltipTrigger} from "@/components/ui/tooltip";

interface Device {
    id: number
    banned: number
    browser: string
    device_id: number
    ip_address: string
    os: string
    created_at: string
}

const Page = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [unbanDialogOpen, setUnbanDialogOpen] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>(0);
    const [devices, setDevices] = useState<Device[]>([]);
    const [devicesCount, setDevicesCount] = useState<number>(0);
    const [os, setOs] = useState("windows 6.5");

    async function getAllDevices() {
        try {
            const response = await axios.get("/api/get-all-devices");
            console.log(response.data)
            setDevices(response.data.devices);
            setDevicesCount(response.data.devicesCount[0].deviceCount);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllDevices();
    }, []);

    function toggleMenu() {
        setIsActive(prevState => !prevState);
        setIsOpen(prevState => !prevState);
    }

    function openBanDialog(id: number) {
        setIsDialogOpen(true);
        setSelectedId(id);
    }

    function openUnBanDialog(id: number) {
        setUnbanDialogOpen(true);
        setSelectedId(id);
    }

    async function banDevice(id: number) {
        try {
            const response = await axios.patch(`/api/ban-device/${id}`);
            toast.success(response.data.message);
            setIsDialogOpen(false);
            await getAllDevices();
        } catch (error: any) {
            toast.error(error.response?.data.message || "Greška prilikom kreiranja projekta");
        }
    }

    async function unBanDevice(id: number) {
        try {
            const response = await axios.patch(`/api/unban-device/${id}`);
            toast.success(response.data.message);
            setUnbanDialogOpen(false);
            await getAllDevices();
        } catch (error: any) {
            toast.error(error.response?.data.message || "Greška prilikom kreiranja projekta");
        }
    }

    function returnIcon(os: string) {
        if (os.toLowerCase().includes("android") || os.toLowerCase().includes("ios")) {
            return <TabletSmartphone className="w-[30px] h-[30px]" />
        } else if (os.toLowerCase().includes("windows") || os.toLowerCase().includes("linux")) {
            return <Monitor className="w-[30px] h-[30px]"/>
        }
    }

    function returnImage(os: string) {
        if (os.toLowerCase().includes("android")) {
            return <Image src={androidsvg} alt="android" className="w-[20px] h-[20px]"/>
        } else if (os.toLowerCase().includes("ios")) {
            return <Image src={applesvg} alt="apple"/>
        }
    }
    return (
        <section>
            <Toaster/>
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
                        <p className='flex items-center text-[#535d6d]'><span onClick={() => router.push("/")} className="hover:cursor-pointer">Početna</span><span><ChevronRight className='w-[20px] translate-y-[2px]'/></span><span className='bg-[#f3f4f6] pt-[1px] pb-[1px] pl-3 pr-3 rounded-xl text-[#586373]'>Uređaji</span></p>
                        <div className='mt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                            <div className="flex-col">
                                <h2 className='text-2xl text-[#1b1b1a] font-bold'>Uređaji ({devicesCount})</h2>
                                <p className='text-md text-muted-foreground font-semibold'>Ovde će biti prikazani svi uređaji sa kojih ste se ulogovali</p>
                            </div>
                        </div>
                    </div>
                    <main className="mt-20 justify-items-center grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] place-items-center gap-y-7 -gap-x-20">
                        {devices.map((device, index) => (
                            <div key={index} className="relative flex-1 max-sm:w-full sm:w-full md:w-[320px] lg:w-[1000px] xl:w-[350px] 2xl:w-[350px] h-auto pb-10 min-h-[270px] rounded-xl shadow-md flex flex-col gap-y-3">
                                <div className="w-[70px] h-[70px] mx-auto rounded-full bg-[#f8f8f8] flex items-center justify-center">
                                    {returnIcon(device.os)}
                                </div>
                                <h1 className="flex items-center gap-x-2 mx-auto">{returnImage(device.os)} {device.os}</h1>
                                <h1 className="flex items-center gap-x-2 mx-auto"><Earth /> {device.ip_address}</h1>
                                <h1 className="flex items-center gap-x-2 mx-auto"><Chrome /> {device.browser}</h1>
                                <h1 className="flex items-center gap-x-2 mx-auto"><ShieldUser /> {device.banned == 1 ? "Banovan" : "Nije banovan"}</h1>
                                <div className="absolute right-2 bottom-2 pt-7 pb-5 h-[40px] flex items-center flex-row gap-x-0">
                                    {
                                        device.banned == 0 ? <Tooltip>
                                            <TooltipTrigger asChild>
                                                <span className="pt-[7px] pb-[7px] pl-[10px] pr-[10px] transition-all duration-200 hover:bg-red-500/90 hover:cursor-pointer hover:text-white rounded-md"><ShieldX onClick={() => openBanDialog(device.id)} /></span>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Banuj uređaj</p>
                                            </TooltipContent>
                                        </Tooltip> :
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <span className="pt-[7px] pb-[7px] pl-[10px] pr-[10px] transition-all duration-200 hover:bg-red-500/90 hover:cursor-pointer hover:text-white rounded-md"><ShieldCheck onClick={() => openUnBanDialog(device.id)}/></span>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Unbanuj uređaj</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    }
                                </div>
                            </div>
                        ))}
                    </main>
                </div>
            </section>
            <AlertDialog open={isDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Da li ste apsolutno sigurni?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="hover:cursor-pointer focus-visible:ring-0" onClick={() => setIsDialogOpen(false)}>Obustavi</AlertDialogCancel>
                        <AlertDialogAction className="hover:cursor-pointer focus-visible:ring-0" onClick={() => banDevice(selectedId)}>Banuj</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog open={unbanDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Da li ste apsolutno sigurni?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="hover:cursor-pointer focus-visible:ring-0" onClick={() => setUnbanDialogOpen(false)}>Obustavi</AlertDialogCancel>
                        <AlertDialogAction className="hover:cursor-pointer focus-visible:ring-0" onClick={() => unBanDevice(selectedId)}>Unbanuj</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </section>
    );
};

export default Page;