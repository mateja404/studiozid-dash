"use client";

import React, { useState, useEffect } from 'react';
import Mapica from './Map';
import SidebarNew from './SidebarNew';
import { ChevronRight } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { useParams } from "next/navigation";
import axios from "axios";

interface ProjectDetails {
    address: string
    budget: number
    end_date: Date
    start_date: Date
    id: number
    lat: number
    lng: number
    payment_status: string
    worker_name: string
}

const HomePage = () => {
  const { id } = useParams();
  const [status, setStatus] = useState<string | undefined>("utoku");
  const [shortUUID, setShortUUID] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [project, setProject] = useState<ProjectDetails[]>([]);
  const [lng, setLng] = useState<number>(0);
  const [lat, setLat] = useState<number>(0);

    useEffect(() => {
        async function getProjectDetails() {
            const response = await axios.get(`/api/get-project-details/${id}`)
                .then(res => {
                    console.log(res.data.projectRows);
                    setProject(res.data.projectRows);
                    setLng(res.data.projectRows[0].lng);
                    setLat(res.data.projectRows[0].lat);
                })
        }
        getProjectDetails();
    }, []);

  function toggleMenu() {
    setIsActive(prevState => !prevState);
    setIsOpen(prevState => !prevState);
  }
  return (
    <>
      <section className='relative overflow-x-hidden w-full flex flex-col xl:flex-row'>
          <button onClick={toggleMenu} className="fixed mt-7 right-5 z-33 w-10 h-10 flex items-center justify-center rounded-xl bg-transparent transition-all duration-200 border border-black/10 group lg:hidden xl:hidden 2xl:hidden" aria-label="Toggle menu">
              <div className="relative flex flex-col items-center justify-center w-5 h-5 overflow-hidden">
                  <span className={`absolute w-5 h-[2px] bg-black rounded-full transform transition-transform duration-300 ease-in-out ${isActive ? "rotate-45" : "-translate-y-1.5"}`}></span>
                  <span className={`absolute w-5 h-[2px] bg-black rounded-full transform transition-all duration-200 ease-in-out ${isActive ? "opacity-0" : "opacity-100"}`}></span>
                  <span className={`absolute w-5 h-[2px] bg-black rounded-full transform transition-transform duration-300 ease-in-out ${isActive ? "-rotate-45" : "translate-y-1.5"}`}></span>
              </div>
          </button>
          <SidebarNew isOpen={isOpen}/>
          <div className={`flex-grow flex flex-col p-4 max-sm:mt-10 md:mt-25 lg:mt-0 xl:mt-0 2xl:mt-0 sm:mt-30 md:p-7 lg:pl-[220px] xl:pl-[320px] 2xl:pl-[320px] max-sm:pt-[120px] ${isOpen ? "hidden" : ""}`}>
              <div className='w-full mb-8'>
                  <p className='flex items-center text-[#535d6d]'>Projekti<span><ChevronRight className='w-[20px]'/></span><span className='bg-[#f3f4f6] pt-[1px] pb-[1px] pl-3 pr-3 rounded-xl text-[#586373]'>{id}</span></p>
                  <div className='mt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                      <h2 className='text-2xl text-[#1b1b1a] font-bold'>Projekat: {id}</h2>
                      <Button className="text-white pt-1 pb-1 pl-5 pr-5 rounded-full bg-black font-semibold cursor-pointer z-0" onClick={() => setStatus("završeno")} disabled={status === "završeno"}> Označi kao završeno</Button>
                  </div>
                {status === "utoku" ? (
                  <p className='bg-[#e5f7ec] rounded-xl pl-3 pr-3 w-max mt-5'>
                    <span className='text-[#499f7a] font-bold'>U toku</span>
                  </p>
                ) : (
                  <p className='bg-red-300/30 rounded-xl pl-3 pr-3 w-max mt-5'>
                    <span className='text-red-400 font-bold'>Završen</span>
                  </p>
                )}
              </div>
          <div className="w-full min-h-[200px] max-w-[100%] mx-auto bg-white rounded-3xl shadow-md p-4 md:p-6 overflow-x-auto">
            <h2 className="text-xl mb-4">Detalji projekta</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Početak radova</TableHead>
                  <TableHead>Kraj radova</TableHead>
                  <TableHead>Status isplate</TableHead>
                  <TableHead>Radnik</TableHead>
                  <TableHead>Adresa</TableHead>
                  <TableHead className="text-right">Budžet</TableHead>
                </TableRow>
              </TableHeader>
                <TableBody>
                    {project.map((proj, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{new Date(proj.start_date).toLocaleDateString('sr-RS')}</TableCell>
                            <TableCell>{new Date(proj.end_date).toLocaleDateString('sr-RS')}</TableCell>
                            <TableCell>{proj.payment_status}</TableCell>
                            <TableCell>{proj.worker_name}</TableCell>
                            <TableCell>{proj.address}</TableCell>
                            <TableCell className="text-right">{proj.budget}&euro;</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </div>
          <div className='flex w-full h-screen xl:h-1/2 2xl:h-1/2 mt-25 flex-col lg:flex-row xl:flex-row 2xl:flex-row gap-x-5 gap-y-10'>
            <div className='flex w-full xl:w-1/2 2xl:w-1/2 h-full'>
              <div className='w-full h-fullflex flex-col max-md:flex-row gap-2'>
                <div className='mx-auto bg-white w-full h-full overflow-y-auto rounded-3xl p-6 shadow-md'>
                    <ul className="w-full space-y-10 relative">
                        <div className="absolute left-[10px] top-0 bottom-0 w-[2px] bg-black"></div>
                        <li className="relative flex items-start">
                        <div className="w-5 h-5 bg-black rounded-full border-4 border-white z-10"></div> {/* Bullet point */}
                        <div className="ml-8 flex flex-col space-y-2">
                          <h3 className="text-lg font-semibold">13 Jan 2022</h3>
                          <p className="text-gray-700">Order placed</p>
                          <span className="text-sm text-gray-500">12:30</span>
                        </div>
                        </li>
                        <li className="relative flex items-start">
                        <div className="w-5 h-5 bg-black rounded-full border-4 border-white z-10"></div>
                        <div className="ml-8 flex flex-col space-y-2">
                            <h3 className="text-lg font-semibold">13 Jan 2022</h3>
                            <p className="text-gray-700">Order confirmed, waiting for payment</p>
                            <span className="text-sm text-gray-500">12:30</span>
                        </div>
                        </li>
                        <li className="relative flex items-start">
                        <div className="w-5 h-5 bg-black rounded-full border-4 translate-x-[0px] border-white z-10"></div>
                        <div className="ml-8 flex flex-col space-y-2">
                            <h3 className="text-lg font-semibold">13 Jan 2022</h3>
                            <p className="text-gray-700">Order finished</p>
                            <span className="text-sm text-gray-500">12:30</span>
                        </div>
                        </li>
                    </ul>
                </div>
            </div>
            </div>
            <div className='flex w-full xl:w-1/2 2xl:w-1/2 h-full rounded-xl bg-white shadow-md items-center justify-center'>
              <div className='w-full h-full items-center justify-center flex'>
                {lat !== 0 && lng !== 0 && (
                  <Mapica lng={lng} lat={lat} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;