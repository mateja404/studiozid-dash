"use client";

import React, { useState } from 'react';
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

const Page = () => {
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

    async function submitProject(e: any) {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/create-project", {
                worker_name: workername,
                budget: budget,
                address: address,
                start_date: startDate?.toLocaleDateString('en-CA'),
                end_date: endDate?.toLocaleDateString('en-CA'),
                payment_status: paymentStatus
            });
            toast.success(response.data.message);
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
            <button onClick={toggleMenu} className="absolute mt-7 z-10 right-5 w-10 h-10 flex items-center justify-center rounded-xl bg-transparent transition-all duration-200 border border-black/10 group lg:hidden xl:hidden 2xl:hidden" aria-label="Toggle menu">
                <div className="relative flex flex-col items-center justify-center w-5 h-5 overflow-hidden">
                    <span className={`absolute w-5 h-[2px] bg-black rounded-full transform transition-transform duration-300 ease-in-out ${isActive ? "rotate-45" : "-translate-y-1.5"}`}></span>
                    <span className={`absolute w-5 h-[2px] bg-black rounded-full transform transition-all duration-200 ease-in-out ${isActive ? "opacity-0" : "opacity-100"}`}></span>
                    <span className={`absolute w-5 h-[2px] bg-black rounded-full transform transition-transform duration-300 ease-in-out ${isActive ? "-rotate-45" : "translate-y-1.5"}`}></span>
                </div>
            </button>
            <SidebarNew isOpen={sidebarOpen} setOpen={setSidebarOpen} />
            <div className="w-full h-full flex -z-1 justify-center items-center overflow-x-hidden max-sm:mt-30 sm:mt-35 xl:mt-15 2xl:mt-15">
                <Toaster />
                <div className={`w-full max-w-sm flex items-center justify-center ${isOpen ? "hidden" : ""}`}>
                    <div className="flex flex-col gap-6 w-full">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">Novi projekat</CardTitle>
                                <CardDescription>Kreirajte novi projekat</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={submitProject}>
                                    <div className="flex flex-col gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="radnik">Radnik</Label>
                                            <Input id="radnik" type="text" placeholder="Petar Petrović" required className="focus-visible:ring-0" onChange={(e) => setWorkername(e.target.value)}/>
                                        </div>

                                        <div className="grid gap-2">
                                            <div className="relative">
                                                <Input type="number" defaultValue={budget} onChange={(e) => setBudget(Number(e.target.value))} className="pl-6 focus-visible:ring-0"/>
                                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-black pointer-events-none">&euro;</span>
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="address">Adresa</Label>
                                            <Input id="address" type="text" placeholder="Petra Petrovića 10, Valjevo" required className="focus-visible:ring-0" onChange={(e) => setAddress(e.target.value)}/>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <Label className="px-1">Početak radova</Label>
                                            <Popover open={startDatePopoverOpen} onOpenChange={setStartDatePopoverOpen}>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className="w-48 justify-between font-normal w-full">
                                                        {startDate ? startDate.toLocaleDateString() : "Izaberite datum"}
                                                        <ChevronDownIcon />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={startDate}
                                                        captionLayout="dropdown"
                                                        onSelect={(date) => {
                                                            setStartDate(date);
                                                            setStartDatePopoverOpen(false);
                                                        }}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <Label className="px-1">Kraj radova</Label>
                                            <Popover open={endDatePopoverOpen} onOpenChange={setEndDatePopoverOpen}>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className="w-48 justify-between font-normal w-full">
                                                        {endDate ? endDate.toLocaleDateString() : "Izaberite datum"}
                                                        <ChevronDownIcon />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={endDate}
                                                        captionLayout="dropdown"
                                                        onSelect={(date) => {
                                                            setEndDate(date);
                                                            setEndDatePopoverOpen(false);
                                                        }}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <Select onValueChange={setPaymentStatus}>
                                            <SelectTrigger className="w-full focus-visible:ring-0">
                                                <SelectValue placeholder="Status isplate" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="Plaćeno">Plaćeno</SelectItem>
                                                    <SelectItem value="Neplaćeno">Neplaćeno</SelectItem>
                                                    <SelectItem value="Avansirano">Avansirano</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <Button type="submit" className="w-full hover:cursor-pointer">
                                            Kreiraj projekat
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