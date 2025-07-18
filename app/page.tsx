"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import SidebarNew from "@/app/components/SidebarNew";
import { Plus,  HardHat,  MoveRight,  UserLock,  ListChecks,  MonitorSmartphone } from "lucide-react";
import { Chart } from "@/app/components/Chart";

export default function Home() {
    const router = useRouter();
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            router.replace("/login");
            toast.error("Nisi ulogovan");
        }
    });
  return (
    <main className="w-screen h-screen flex bg-[#f8f8f8] overflow-x-hidden">
        <Toaster/>
        <SidebarNew/>
        <section className="flex-grow flex flex-col overflow-x-hidden h-full p-4 lg:mt-0 sm:mt-30 xl:mt-0 md:p-7 lg:pl-[230px] xl:pl-[320px] 2xl:pl-[320px] max-sm:pt-[120px]">
            <div className="w-full h-auto flex-col bg-transparent flex">
                <div className="w-full h-1/4 flex flex-col md:flex-row lg:flex-row bg-transparent">
                    <div className="flex-col w-full lg:w-1/2 h-full p-3 flex">
                        <h1 className="font-semibold text-lg text-black">Admin Dashboard</h1>
                        <p className="text-sm text-muted-foreground">Kreirajte, uređujte i upravljajte projektima</p>
                    </div>
                    <div className="flex flex-row w-full lg:w-1/2 h-full p-3 justify-end">
                        <button className="max-sm:w-full sm:w-full md:w-1/2 justify-center bg-black rounded-xl pt-2 pb-2 pl-5 pr-5 text-white flex gap-x-2 text-sm items-center cursor-pointer"><Plus className="w-[17px]"/> Novi projekat</button>
                    </div>
                </div>
                <div className="w-full h-auto min-h-3/4 bg-transparent flex items-center justify-center">
                    <div className="flex md:flex-row flex-col h-auto w-full p-3 items-center justify-center gap-3">
                        <div className="w-full md:w-1/4 lg:w-1/4 h-auto min-h-[120px] max-h-[200px] bg-white p-5 rounded-xl shadow-md flex flex-col gap-y-5">
                            <h1 className="flex gap-x-3 text-md items-center font-semibold"><HardHat className="text-red-400" /> Aktivni projekti</h1>
                            <div className="flex flex-row justify-between items-center">
                                <p className="text-3xl font-bold text-zinc-700">320</p>
                                <MoveRight className="text-muted-foreground"/>
                            </div>
                        </div>
                        <div className="w-full md:w-1/4 lg:w-1/4 h-auto min-h-[120px] max-h-[120px] bg-white p-5 rounded-xl shadow-md flex flex-col gap-y-5">
                            <h1 className="flex gap-x-3 text-md items-center font-semibold"><ListChecks className="text-green-300" /> Završeni projekti</h1>
                            <div className="flex flex-row justify-between items-center">
                                <p className="text-3xl font-bold text-zinc-700">52</p>
                                <MoveRight className="text-muted-foreground"/>
                            </div>
                        </div>
                        <div className="w-full md:w-1/4 lg:w-1/4 h-auto min-h-[120px] max-h-[200px] bg-white p-5 rounded-xl shadow-md flex flex-col gap-y-5">
                            <h1 className="flex gap-x-3 text-md items-center font-semibold"><UserLock className="text-blue-900" /> Radnici</h1>
                            <div className="flex flex-row justify-between items-center">
                                <p className="text-3xl font-bold text-zinc-700">30</p>
                                <MoveRight className="text-muted-foreground"/>
                            </div>
                        </div>
                        <div className="w-full md:w-1/4 lg:w-1/4 h-auto min-h-[120px] max-h-[200px] bg-white p-5 rounded-xl shadow-md flex flex-col gap-y-5">
                            <h1 className="flex gap-x-3 text-md items-center font-semibold"><MonitorSmartphone /> Uređaji</h1>
                            <div className="flex flex-row justify-between items-center">
                                <p className="text-3xl font-bold text-zinc-700">15</p>
                                <MoveRight className="text-muted-foreground"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-auto p-3">
                <div className="w-full md:w-1/2">
                    <Chart/>
                </div>
            </div>
        </section>
    </main>
  );
}