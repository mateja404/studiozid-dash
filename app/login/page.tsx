import React from 'react';
import { LoginForm } from "@/components/login-form";

const Page = () => {
    return (
        <section className="w-full h-screen flex items-center justify-center">
            <div className="w-[90%] md:w-full h-full flex items-center justify-center">
                <LoginForm/>
            </div>
        </section>
    );
};

export default Page;