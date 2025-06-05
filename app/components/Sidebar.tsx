"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { Wrench, Users, LayoutDashboard, Laptop } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <div className={`w-full ${isOpen ? "h-full" : "h-[100px]"} bg-white shadow-md rounded-xl xl:w-[300px] xl:h-full 2xl:h-full 2xl:w-[300px]`}>
      <h1 className='absolute top-5 left-5 font-bold text-2xl'>Studio Zid</h1>
      <ul className='mt-25 ml-5 xl:flex 2xl:flex flex-col gap-y-5 hidden'>
        <li><Link href={"/"} className='flex gap-x-3 font-bold text-muted-foreground hover:text-black transition-all duration-300'><LayoutDashboard /> Početna</Link></li>
        <li><Link href={"/"} className='flex gap-x-3 font-bold text-muted-foreground hover:text-black transition-all duration-300'><Users /> Zaposleni</Link></li>
        <li><Link href={"/"} className='flex gap-x-3 font-bold text-muted-foreground hover:text-black transition-all duration-300'><Laptop /> Uređaji</Link></li>
        <li><Link href={"/"} className='flex gap-x-3 font-bold text-muted-foreground hover:text-black transition-all duration-300'><Wrench /> Projekti</Link></li>
      </ul>
    </div>
  )
}

export default Sidebar;