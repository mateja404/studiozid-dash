"use client";

import React, { useState } from 'react';
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import toast, { Toaster } from "react-hot-toast";
import SidebarNew from "@/app/components/SidebarNew";
import { useRouter } from "next/navigation";
import { Textarea } from '@/components/ui/textarea';
import { useParams } from 'next/navigation';

const Page = () => {
    const router = useRouter();
    const { id } = useParams();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [change, setChange] = useState<string>("");

    async function submitProject(e: any) {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/create-change/${id}`, { change: change });
            toast.success(response.data.message);
            setTimeout(() => {
                router.push("/projekti")
            }, 1200);
        } catch (error: any) {
            console.log("Error submitting project:", error.response?.data);
            toast.error(error.response?.data.message || "Greška prilikom kreiranja projekta");
        }
    }

    function toggleMenu() {
        setIsActive((prev) => !prev);
        setSidebarOpen((prev) => !prev);
    }
    return (
        <section className="relative overflow-x-hidden w-full min-h-screen flex">
            <Toaster/>
            <button onClick={toggleMenu} className="fixed mt-7 right-5 z-33 w-10 h-10 flex items-center justify-center rounded-xl bg-transparent transition-all duration-200 border border-black/10 group lg:hidden xl:hidden 2xl:hidden" aria-label="Toggle menu">
                <div className="relative flex flex-col items-center justify-center w-5 h-5 overflow-hidden">
                    <span className={`absolute w-5 h-[2px] bg-black rounded-full transform transition-transform duration-300 ease-in-out ${isActive ? "rotate-45" : "-translate-y-1.5"}`}></span>
                    <span className={`absolute w-5 h-[2px] bg-black rounded-full transform transition-all duration-200 ease-in-out ${isActive ? "opacity-0" : "opacity-100"}`}></span>
                    <span className={`absolute w-5 h-[2px] bg-black rounded-full transform transition-transform duration-300 ease-in-out ${isActive ? "-rotate-45" : "translate-y-1.5"}`}></span>
                </div>
            </button>
            <SidebarNew isOpen={sidebarOpen} setOpen={setSidebarOpen} />
            <div className="w-full h-full flex z-0 justify-center items-center overflow-x-hidden max-sm:mt-30 sm:mt-35 xl:mt-15 2xl:mt-15">
                <Toaster />
                <div className={`w-full max-w-md h-[500px] flex items-center justify-center ${isOpen ? "hidden" : ""}`}>
                    <div className="flex flex-col gap-6 w-full">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">Unos izmene na timeline</CardTitle>
                                <CardDescription>Dodajte novu promenu u projektu</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={submitProject}>
                                    <div className="flex flex-col gap-6">
                                        <Textarea placeholder='Unesite detalje o promeni' className='max-h-[300px] h-[100px] focus-visible:ring-0' onChange={(e) => setChange(e.target.value)}></Textarea>
                                        <Button type="submit" className="w-[100%] hover:cursor-pointer">
                                            Dodaj
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Page;