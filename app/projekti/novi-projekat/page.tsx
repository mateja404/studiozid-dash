"use client";

import React, { useState } from 'react';
import axios from "axios";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Popover,  PopoverContent,  PopoverTrigger, } from "@/components/ui/popover"
import { Card,  CardContent,  CardDescription,  CardHeader,  CardTitle, } from "@/components/ui/card";

const Page = () => {
    const [workername, setWorkername] = useState("");
    const [budget, setBudget] = useState(0);
    const [address, setAddress] = useState("");
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [endDate, setEndDate] = useState<Date | undefined>();
    const [paymentStatus, setPaymentStatus] = useState("");
    const [open, setOpen] = useState(false)
    const [openDva, setOpenDva] = useState(false)

    async function submitProject() {
        console.log("Data to be sent:", {
            workername,
            budget,
            address,
            startDate,
            endDate,
            paymentStatus
        });

        const response = await axios.post("http://localhost:3000/api/create-project", {
            worker_name: workername,
            budget: budget,
            address: address,
            start_date: startDate?.toLocaleDateString('en-CA'),
            end_date: endDate?.toLocaleDateString('en-CA'),
            payment_status: paymentStatus
        }).then(res => {
            console.log(res.data);
        }).catch(error => {
            console.log("Error submitting project:", error.response?.data);
        });
    }
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-full max-w-sm flex items-center justify-center">
                <div className={("flex flex-col gap-6 w-full")}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Novi projekat</CardTitle>
                            <CardDescription>
                                Kreirajte novi projekat
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Radnik</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                            className="focus-visible:ring-0"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <Label htmlFor="date" className="px-1">
                                            Početak radova
                                        </Label>
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    id="date"
                                                    className="w-48 justify-between font-normal w-full"
                                                >
                                                    {startDate ? startDate.toLocaleDateString() : "Select date"}
                                                    <ChevronDownIcon/>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={startDate}
                                                    captionLayout="dropdown"
                                                    onSelect={(date) => {
                                                        setStartDate(date)
                                                        setOpen(false)
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <Label htmlFor="date" className="px-1">
                                            Kraj radova
                                        </Label>
                                        <Popover open={openDva} onOpenChange={setOpenDva}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    id="date"
                                                    className="w-48 justify-between font-normal w-full"
                                                >
                                                    {endDate ? endDate.toLocaleDateString() : "Select date"}
                                                    <ChevronDownIcon/>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={endDate}
                                                    captionLayout="dropdown"
                                                    onSelect={(date) => {
                                                        setEndDate(date)
                                                        setOpen(false)
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Pošalji email
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Page;
