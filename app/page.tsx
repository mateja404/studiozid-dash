"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

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
    <div className="w-screen h-screen flex">
        <Toaster/>
        homepage
    </div>
  );
}