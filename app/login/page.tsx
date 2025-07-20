import React from 'react';
import { LoginForm } from "@/components/login-form";
import { cookies } from 'next/headers';
import { isDeviceBanned } from "@/app/utils/isBanned";
import { redirect } from "next/navigation";

const Page = async () => {
    const deviceId = cookies().get('device_id')?.value;

    if (deviceId) {
        const banned = await isDeviceBanned(deviceId);
        if (banned) redirect('/banned');
    }
    return (
        <section className="w-full h-screen flex items-center justify-center">
            <div className="w-[90%] md:w-full h-full flex items-center justify-center">
                <LoginForm deviceId={deviceId}/>
            </div>
        </section>
    );
};

export default Page;