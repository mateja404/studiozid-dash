"use client";

import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import toast, { Toaster } from "react-hot-toast";
import SidebarNew from "@/app/components/SidebarNew";
import { useRouter } from "next/navigation";
import { Textarea } from '@/components/ui/textarea';

interface Worker {
    workerName: string
}

const Page = () => {
    const router = useRouter();
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [workername, setWorkername] = useState("");
    const [budget, setBudget] = useState<number | undefined>(0);
    const [address, setAddress] = useState("");
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [endDate, setEndDate] = useState<Date | undefined>();
    const [paymentStatus, setPaymentStatus] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [startDatePopoverOpen, setStartDatePopoverOpen] = useState(false);
    const [endDatePopoverOpen, setEndDatePopoverOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [workers, setWorkers] = useState<Worker[]>([]);

    useEffect(() => {
        async function getAllNames() {
            try {
                const response = await axios.get("/api/get-all-workers")
                setWorkers(response.data.workers)
                console.log(response.data)
            } catch (error) {}
        }
        getAllNames();
    }, []);

    async function submitProject(e: any) {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/create-project", {
                title: title,
                desc: desc,
                worker_name: workername,
                budget: budget,
                address: address,
                start_date: startDate?.toLocaleDateString('en-CA'),
                end_date: endDate?.toLocaleDateString('en-CA'),
                payment_status: paymentStatus
            });
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
                                        <Textarea placeholder='Unesite detalje o promeni' className='max-h-[300px] h-[100px] focus-visible:ring-0'></Textarea>
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