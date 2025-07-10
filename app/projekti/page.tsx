"use client";

import React, { useState, useEffect } from 'react';
import toast, { Toaster } from "react-hot-toast";
import SidebarNew from "@/app/components/SidebarNew";
import { ChevronRight, ExternalLink, Plus, Trash2, UserRoundPen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AlertDialogHeader, AlertDialogFooter, AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';

interface project {
    id: number
    address: string
    budget: number
    worker_name: string
    start_date: string
    end_date: string
}

const Page = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [projects, setProjects] = useState<project[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [projectsCount, setprojectsCount] = useState<number>(0);
    const [selectedId, setSelectedId] = useState<number>(0);

    async function getAllprojects() {
        try {
            const response = await axios.get("/api/get-all-projects");
            console.log(response.data)
            setProjects(response.data.projects);
            setprojectsCount(response.data.projectsCount);
        } catch (error) {}
    }

    useEffect(() => {
        getAllprojects();
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
                getAllprojects();
        } catch (error: any) {
            toast.error(error.response?.data.message || "Greška prilikom kreiranja projekta");
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
                        <p className='flex items-center text-[#535d6d]'><span onClick={() => router.push("/")} className="hover:cursor-pointer">Početna</span><span><ChevronRight className='w-[20px] translate-y-[2px]'/></span><span className='bg-[#f3f4f6] pt-[1px] pb-[1px] pl-3 pr-3 rounded-xl text-[#586373]'>Projekti</span></p>
                        <div className='mt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                            <div className="flex-col">
                                <h2 className='text-2xl text-[#1b1b1a] font-bold'>Projekti ({projectsCount})</h2>
                                <p className='text-md text-muted-foreground font-semibold'>Ovde će biti prikazani svi projekti</p>
                            </div>
                            <Button className="text-white pt-1 pb-1 pl-5 pr-5 rounded-full bg-black font-semibold cursor-pointer z-0" onClick={() => router.push("/projekti/novi-projekat")}><Plus/> Kreiraj novi projekat</Button>
                        </div>
                    </div>
                    <main className="mt-20 justify-items-center grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] place-items-center gap-y-7 -gap-x-20">
                        {projects.map((project, index) => (
                            <div key={index} className="relative max-sm:w-full sm:w-full md:w-[320px] lg:w-[1000px] xl:w-[350px] 2xl:w-[350px] h-[250px] rounded-xl shadow-md">
                                <h1 className="mt-5 mx-5 w-full truncate font-semibold text-black text-xl max-w-[calc(100%-40px)]">Adresa: {project.address}</h1>
                                <p className="absolute top-14 mx-5 text-muted-foreground text-md">Budžet: <span className='text-black'>{project.budget}€</span></p>
                                <p className="absolute top-20 mx-5 text-muted-foreground text-md">Radnik: <span className='text-black'>{project.worker_name}</span></p>
                                <p className="absolute top-26 mx-5 text-muted-foreground text-md">Početak radova: <span className='text-black'>{new Date(project.start_date).toLocaleDateString("sr-RS", { day: "2-digit", month: "2-digit", year: "numeric" })}</span></p>
                                <p className="absolute top-32 mx-5 text-muted-foreground text-md">Kraj radova: <span className='text-black'>{new Date(project.end_date).toLocaleDateString("sr-RS", { day: "2-digit", month: "2-digit", year: "numeric" })}</span></p>
                                <div className="absolute bottom-2 w-full h-[40px] flex items-center">
                                    <span className="absolute right-33 pt-[7px] pb-[7px] pl-[10px] pr-[10px] transition-all duration-200 hover:bg-red-500/90 hover:cursor-pointer hover:text-white rounded-md">
                                        <ExternalLink onClick={() => router.push(`projekti/projekat/${project.id}`)} />
                                    </span>
                                    <span className="absolute right-20 pt-[7px] pb-[7px] pl-[10px] pr-[10px] transition-all duration-200 hover:bg-red-500/90 hover:cursor-pointer hover:text-white rounded-md">
                                        <UserRoundPen onClick={() => router.push(`projekti/edit/${project.id}`)} />
                                    </span>
                                    <span className="absolute right-7 pt-[7px] pb-[7px] pl-[10px] pr-[10px] transition-all duration-200 hover:bg-red-500/90 hover:cursor-pointer hover:text-white rounded-md">
                                        <Trash2 onClick={() => deleteProccess(project.id)} />
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
                            Jednom kada obrišete projekat ne postoji šansa da se povrati. Ovo će trajno obrisati projekat iz naše baze podataka.
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