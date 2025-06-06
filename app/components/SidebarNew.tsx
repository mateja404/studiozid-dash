"use client";

import React from 'react';
import Link from "next/link";
import { Wrench, Users, LayoutDashboard, Laptop } from 'lucide-react';

const SidebarNew = ({ isOpen }: any) => {
  return (
    <nav>
        <div className='fixed left-0 top-0 bg-white shadow-md rounded-xl hidden lg:flex xl:flex 2xl:flex lg:w-[210px] xl:w-[300px] 2xl:w-[300px] h-screen'>
            <ul className="flex flex-col gap-y-5 mt-30 ml-5 text-muted-foreground">
                <li><Link href={"/"} className="flex gap-x-3 font-bold text-lg hover:text-black transition-all duration-400"><LayoutDashboard/> Početna</Link></li>
                <li><Link href={"/"} className="flex gap-x-3 font-bold text-lg hover:text-black transition-all duration-400"><Users/> Zaposleni</Link></li>
                <li><Link href={"/"} className="flex gap-x-3 font-bold text-lg hover:text-black transition-all duration-400"><Laptop/> Uređaji</Link></li>
                <li><Link href={"/"} className="flex gap-x-3 font-bold text-lg hover:text-black transition-all duration-400"><Wrench/> Projekti</Link></li>
            </ul>
        </div>
        <div className={`${isOpen ? "min-h-screen w-full bg-white flex z-1" : "h-[100px] w-full bg-white shadow-md"}`}>
            <h1 className='absolute left-7 font-bold text-2xl mt-7'>Studio Zid</h1>
            <ul className={`gap-y-7 flex-col mx-auto mt-35 ${isOpen ? "flex" : "hidden -translate-y-100 transition ease-in-out duration-300"}`}>
                <li><Link className='flex gap-x-3 font-bold text-2xl items-center' href={"/"}><LayoutDashboard/>Početna</Link></li>
                <li><Link className='flex gap-x-3 font-bold text-2xl items-center' href={"/"}><Users/>Zaposleni</Link></li>
                <li><Link className='flex gap-x-3 font-bold text-2xl items-center' href={"/"}><Laptop/>Uređaji</Link></li>
                <li><Link className='flex gap-x-3 font-bold text-2xl items-center' href={"/"}><Wrench/>Projekti</Link></li>
            </ul>
        </div>
    </nav>
  )
}

export default SidebarNew;