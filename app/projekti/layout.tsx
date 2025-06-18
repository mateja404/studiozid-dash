import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Studio Zid | Projekti",
    description: "Studio Zid - Stranica za upravljanje projektima",
};

export default function AdminLayout({ children,}: { children: React.ReactNode; }) {
    return (
        <div>
            {children}
        </div>
    );
}