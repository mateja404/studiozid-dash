"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import SidebarNew from "@/app/components/SidebarNew";
import { Plus,  HardHat,  MoveRight,  UserLock,  ListChecks,  MonitorSmartphone } from "lucide-react";
import { IncomeChart } from "@/app/components/IncomeChart";
import { ProjectsPieChart } from "@/app/components/ProjectsPieChart";
import Link from "next/link";

export default function Home() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            router.replace("/login");
            toast.error("Nisi ulogovan");
        }
    });

    function toggleMenu() {
        setIsActive(prevState => !prevState);
        setIsOpen(prevState => !prevState);
    }
  return (
      <main className="w-screen h-screen flex bg-[#f8f8f8] overflow-x-hidden">
          <Toaster/>
          <button onClick={toggleMenu}
                  className="fixed mt-7 right-5 z-33 w-10 h-10 flex items-center justify-center rounded-xl bg-transparent transition-all duration-200 border border-black/10 group lg:hidden xl:hidden 2xl:hidden"
                  aria-label="Toggle menu">
              <div className="relative flex flex-col items-center justify-center w-5 h-5 overflow-hidden">
                  <span
                      className={`absolute w-5 h-[2px] bg-black rounded-full transform transition-transform duration-300 ease-in-out ${isActive ? "rotate-45" : "-translate-y-1.5"}`}></span>
                  <span
                      className={`absolute w-5 h-[2px] bg-black rounded-full transform transition-all duration-200 ease-in-out ${isActive ? "opacity-0" : "opacity-100"}`}></span>
                  <span
                      className={`absolute w-5 h-[2px] bg-black rounded-full transform transition-transform duration-300 ease-in-out ${isActive ? "-rotate-45" : "translate-y-1.5"}`}></span>
              </div>
          </button>
          <SidebarNew isOpen={isOpen}/>
          <section className={"flex-grow flex flex-col overflow-x-hidden h-full p-4 lg:mt-0 sm:mt-30 md:p-7 lg:pl-[230px] xl:pl-[320px] 2xl:pl-[320px] max-sm:pt-[120px]"}>
              <div className="w-full h-auto flex-col bg-transparent flex">
                  <div className="w-full h-auto flex flex-col md:flex-row lg:flex-row">
                      <div className="flex-col w-full lg:w-1/2 h-full p-3 flex">
                          <h1 className="font-semibold text-lg text-black">Admin Dashboard</h1>
                          <p className="text-sm text-muted-foreground">Kreirajte, uređujte i upravljajte projektima</p>
                      </div>
                      <div className="flex flex-row w-full lg:w-1/2 h-full p-3 justify-end">
                          <button
                              className="max-sm:w-full sm:w-full md:w-1/2 justify-center bg-black rounded-xl pt-2 pb-2 pl-5 pr-5 text-white flex gap-x-2 text-sm items-center cursor-pointer">
                              <Plus className="w-[17px]"/> Novi projekat
                          </button>
                      </div>
                  </div>
                  <div className="w-full h-auto min-h-3/4 bg-transparent flex items-center justify-center">
                      <div className="flex md:flex-row flex-col h-auto w-full p-3 items-center justify-center gap-3">
                          <div
                              className="w-full md:w-1/4 lg:w-1/4 h-auto min-h-[120px] max-h-[200px] bg-white p-5 rounded-xl shadow-md flex flex-col gap-y-5">
                              <h1 className="flex gap-x-3 text-md items-center font-semibold"><HardHat
                                  className="text-red-400"/> Aktivni projekti</h1>
                              <div className="flex flex-row justify-between items-center">
                                  <p className="text-3xl font-bold text-zinc-700">320</p>
                                  <Link href={"/projekti"} className="group"><MoveRight
                                      className="group-hover:text-red-500 transition-all duration-300 text-muted-foreground"/></Link>
                              </div>
                          </div>
                          <div
                              className="w-full md:w-1/4 lg:w-1/4 h-auto min-h-[120px] max-h-[120px] bg-white p-5 rounded-xl shadow-md flex flex-col gap-y-5">
                              <h1 className="flex gap-x-3 text-md items-center font-semibold"><ListChecks
                                  className="text-green-300"/> Završeni projekti</h1>
                              <div className="flex flex-row justify-between items-center">
                                  <p className="text-3xl font-bold text-zinc-700">52</p>
                                  <Link href={"/projekti"} className="group"><MoveRight
                                      className="group-hover:text-green-300 transition-all duration-300 text-muted-foreground"/></Link>
                              </div>
                          </div>
                          <div
                              className="w-full md:w-1/4 lg:w-1/4 h-auto min-h-[120px] max-h-[200px] bg-white p-5 rounded-xl shadow-md flex flex-col gap-y-5">
                              <h1 className="flex gap-x-3 text-md items-center font-semibold"><UserLock
                                  className="text-blue-900"/> Radnici</h1>
                              <div className="flex flex-row justify-between items-center">
                                  <p className="text-3xl font-bold text-zinc-700">30</p>
                                  <Link href={"/zaposleni"} className="group"><MoveRight
                                      className="group-hover:text-blue-900 transition-all duration-300 text-muted-foreground"/></Link>
                              </div>
                          </div>
                          <div
                              className="w-full md:w-1/4 lg:w-1/4 h-auto min-h-[120px] max-h-[200px] bg-white p-5 rounded-xl shadow-md flex flex-col gap-y-5">
                              <h1 className="flex gap-x-3 text-md items-center font-semibold">
                                  <MonitorSmartphone/> Uređaji</h1>
                              <div className="flex flex-row justify-between items-center">
                                  <p className="text-3xl font-bold text-zinc-700">15</p>
                                  <Link href={"/uredjaji"} className="group"><MoveRight
                                      className="group-hover:text-black transition-all duration-300 text-muted-foreground"/></Link>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="w-full h-auto p-3 flex flex-col lg:flex-row gap-3">
                  <div className="w-full md:w-1/2">
                      <IncomeChart/>
                  </div>
                  <div className="w-full md:w-1/2">
                      <ProjectsPieChart/>
                  </div>
              </div>
          </section>
      </main>
  );
}