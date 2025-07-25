"use client";

import React, { useState, useEffect } from 'react';
import SidebarNew from "@/app/components/SidebarNew";
import { ChevronRight, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { AlertDialog,  AlertDialogAction,  AlertDialogCancel,  AlertDialogContent,  AlertDialogDescription,  AlertDialogFooter,  AlertDialogHeader,  AlertDialogTitle } from "@/components/ui/alert-dialog";
import toast, { Toaster } from "react-hot-toast";

interface worker {
    workerName: string,
    position: string,
    profilePicture: string,
    categories: string[],
    id: number,
    projectsCount: number
}

const Page = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [workersCount, setWorkersCount] = useState<number>(0);
    const [workers, setWorkers] = useState<worker[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number>(0);

    async function getAllWorkers() {
        try {
            const response = await axios.get("/api/get-all-workers");
            setWorkers(response.data.workers);
            setCategories(response.data.workers.categories);
            setWorkersCount(response.data.workersCount);
        } catch (error) {}
    }

    useEffect(() => {
        getAllWorkers();
    }, []);

    function toggleMenu() {
        setIsActive(prevState => !prevState);
        setIsOpen(prevState => !prevState);
    }

    function deleteProccess(id: number) {
        setIsDialogOpen(true);
        setSelectedId(id);
    }

    async function deleteWorker(id: number) {
        try {
            const response = await axios.delete("/api/delete-worker", { data: { id: id } })
                toast.success(response.data.message);
                setIsDialogOpen(false);
                getAllWorkers();
        } catch (error: any) {
            toast.error(error.response?.data.message || "Greška prilikom kreiranja projekta");
        }
    }
    return (
        <section className="w-full min-h-screen relative flex flex-col">
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
                        <p className='flex items-center text-[#535d6d]'><span onClick={() => router.push("/")} className="hover:cursor-pointer">Početna</span><span><ChevronRight className='w-[20px] translate-y-[2px]'/></span><span className='bg-[#f3f4f6] pt-[1px] pb-[1px] pl-3 pr-3 rounded-xl text-[#586373]'>Zaposleni</span></p>
                        <div className='mt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                            <div className="flex-col">
                                <h2 className='text-2xl text-[#1b1b1a] font-bold'>Zaposleni ({workersCount})</h2>
                                <p className='text-md text-muted-foreground font-semibold'>Ovde će biti prikazani svi zaposleni</p>
                            </div>
                            <Button className="text-white pt-1 pb-1 pl-5 pr-5 rounded-full bg-black font-semibold cursor-pointer z-0" onClick={() => router.push("/zaposleni/kreiraj-zaposlenog")}><Plus/> Dodaj novog radnika</Button>
                        </div>
                    </div>
                    <main className="mt-20 justify-items-center grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] place-items-center gap-y-7 -gap-x-20">
                        {workers.map((worker, index) => (
                            <div key={index} className="relative max-sm:w-full sm:w-full md:w-[320px] lg:w-[1000px] xl:w-[320px] 2xl:w-[320px] h-[250px] rounded-xl shadow-md">
                                <div
                                    className="absolute top-5 left-5 w-[65px] border-gray-200 border-3 h-[65px] rounded-full bg-white flex items-center justify-center">
                                    <Image src={worker.profilePicture} alt={"radnik"} width={55} height={55} className="object-fit w-[55px] h-[55px] rounded-full"/>
                                </div>
                                <h1 className="mt-5 mx-25 w-full font-semibold text-black text-xl">{worker.workerName}</h1>
                                <p className="absolute top-14 left-26 text-muted-foreground text-md">{worker.position}</p>
                                <div className="flex flex-col xl:flex-row 2xl:flex-row absolute left-5 top-25 w-[90%] h-[50px]">
                                    <div className="h-1/2 flex gap-2 flex-wrap">
                                        {worker.categories.map((category, index) => (
                                            <Badge key={index} variant={"secondary"} className="pt-[5px] pb-[5px] pl-3 pr-3">
                                                {category}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <p className="absolute bottom-15 left-7 text-black font-semibold">Ukupno projekata: <span className="text-muted-foreground">{worker.projectsCount}</span></p>
                                <div className="absolute bottom-2 w-full h-[40px] flex items-center">
                                    <span className="absolute right-7 pt-[7px] pb-[7px] pl-[10px] pr-[10px] transition-all duration-200 hover:bg-red-500/90 hover:cursor-pointer hover:text-white rounded-md">
                                        <Trash2 onClick={() => deleteProccess(worker.id)} />
                                    </span>
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
                        <AlertDialogDescription>
                            Jednom kada obrišete zaposlenog ne postoji šansa da se povrati. Ovo će trajno obrisati zaposlenog iz naše baze podataka.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="hover:cursor-pointer focus-visible:ring-0" onClick={() => setIsDialogOpen(false)}>Obustavi</AlertDialogCancel>
                        <AlertDialogAction className="hover:cursor-pointer focus-visible:ring-0" onClick={() => deleteWorker(selectedId)}>Obriši</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </section>
    );
};

export default Page;