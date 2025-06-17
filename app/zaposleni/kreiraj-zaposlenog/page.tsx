"use client";

import React, { useState, useEffect } from 'react';
import MultiSelect from "@/components/ui/Multiselector";
import { useEdgeStore } from "@/app/utils/edgestore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from "@/components/ui/select";
import SidebarNew from "@/app/components/SidebarNew";
import { useRouter } from "next/navigation";

const Page = () => {
    const { edgestore }: any = useEdgeStore();
    const router = useRouter();
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [file, setFile] = useState<File>();
    const [workerName, setWorkerName] = useState<string>("");
    const [position, setPosition] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<number>(0);
    const [profilePicture, setProfilePicture] = useState<string>("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const options = [
        { value: "Moler", label: "Moler" },
        { value: "Gipsar", label: "Gipsar" },
        { value: "Fasader", label: "Fasader" },
    ];

    async function createWorker(e: any) {
        e.preventDefault();
        try {
            const res = await edgestore.publicFiles.upload({ file });
            setProfilePicture(res.url);

            if (!res.url) {
                toast.error("Slika nije uspešno uploadovana. Molimo pokušajte ponovo.");
                return;
            }

            if (res.url) {
                const response = await axios.post("http://localhost:3000/api/create-worker", {
                    workerName: workerName,
                    category: selectedCategories,
                    phoneNumber: phoneNumber,
                    position: position,
                    profilePicture: res.url,
                });
            }

            toast.success("Radnik je uspešno kreiran");
            setTimeout(() => {
                router.push("/zaposleni");
            }, 1200);

        } catch (error: any) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else if (error.request) {
                console.log('Greška u zahtevu', error.request);
            } else {
                console.log('Nepoznata greška', error.message);
            }
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
            <SidebarNew isOpen={sidebarOpen} setOpen={setSidebarOpen}/>
            <div className={`w-full max-w-sm flex items-center justify-center mt-35 lg:mt-0 xl:mt-0 2xl:mt-0 mx-auto`}>
                <div className="flex flex-col gap-6 w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Novi zaposleni</CardTitle>
                            <CardDescription>Kreirajte novog zaposlenog</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={createWorker}>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="radnik">Ime i prezime</Label>
                                        <Input id="radnik" type="text" placeholder="Petar Petrović" required className="focus-visible:ring-0" onChange={(e) => setWorkerName(e.target.value)}/>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="phonenumber">Broj telefona</Label>
                                        <Input id="phonenumber" type="number" placeholder="063555333" required className="focus-visible:ring-0" onChange={(e) => setPhoneNumber(Number(e.target.value))}/>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <Label className="px-1">Pozicija</Label>
                                        <Select onValueChange={setPosition}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Izaberite poziciju..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="Radnik">Radnik</SelectItem>
                                                    <SelectItem value="Menadžer">Menadžer</SelectItem>
                                                    <SelectItem value="Vlasnik">Vlasnik</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <Label className="px-1">Kategorija</Label>
                                        <MultiSelect placeholder="Izaberite kategoriju..." options={options} selectedValues={selectedCategories} setSelectedValues={setSelectedCategories}/>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <Label className="px-1">Profilna slika</Label>
                                        <Input type={"file"} onChange={(e) => setFile(e.target.files?.[0])} />
                                    </div>
                                    <Button type="submit" className="w-full hover:cursor-pointer">
                                        Kreiraj zaposlenog
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default Page;