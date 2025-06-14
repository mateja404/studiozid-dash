"use client";

import React from 'react';
import Link from "next/link";
import { Wrench, Users, LayoutDashboard, Laptop } from 'lucide-react';

const SidebarNew = ({ isOpen }: any) => {
    return (
        <nav>
            {/* Desktop Sidebar */}
            <div
                className='fixed left-0 top-0 bg-white shadow-md rounded-xl hidden lg:flex xl:flex 2xl:flex lg:w-[210px] xl:w-[300px] 2xl:w-[300px] h-screen z-20'>
                <h1 className='absolute left-7 font-bold text-2xl mt-5'>Studio Zid</h1>
                <ul className="flex flex-col gap-y-5 mt-30 ml-5 text-muted-foreground">
                    <li><Link href={"/"} className="flex gap-x-3 font-bold text-lg hover:text-black transition-all duration-400"><LayoutDashboard/> Početna</Link></li>
                    <li><Link href={"/zaposleni"} className="flex gap-x-3 font-bold text-lg hover:text-black transition-all duration-400"><Users/> Zaposleni</Link></li>
                    <li><Link href={"/"} className="flex gap-x-3 font-bold text-lg hover:text-black transition-all duration-400"><Laptop/> Uređaji</Link></li>
                    <li><Link href={"/"} className="flex gap-x-3 font-bold text-lg hover:text-black transition-all duration-400"><Wrench/> Projekti</Link></li>
                </ul>
            </div>
            {/* Mobile Sidebar */}
            <div className={`fixed top-0 left-0 h-[100px] w-full z-30 bg-white shadow-md transition-all duration-300 ${isOpen ? 'min-h-screen flex flex-col' : 'h-[60px] flex justify-center items-center'} lg:hidden xl:hidden 2xl:hidden`}>
                <h1 className={`absolute left-7 font-bold text-2xl mt-0 ${isOpen ? "mt-7" : "mt-0"}`}>Studio Zid</h1>
                <ul className={`transition-all duration-300 mt-24 flex flex-col items-center gap-y-7 ${isOpen ? 'opacity-100 translate-0' : 'opacity-0 -translate-x-100 mt-0'}`}>
                    <li><Link className='flex gap-x-3 font-bold text-2xl items-center' href={"/"}><LayoutDashboard /> Početna</Link></li>
                    <li><Link className='flex gap-x-3 font-bold text-2xl items-center' href={"/"}><Users /> Zaposleni</Link></li>
                    <li><Link className='flex gap-x-3 font-bold text-2xl items-center' href={"/"}><Laptop /> Uređaji</Link></li>
                    <li><Link className='flex gap-x-3 font-bold text-2xl items-center' href={"/"}><Wrench /> Projekti</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default SidebarNew;