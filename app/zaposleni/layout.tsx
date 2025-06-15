import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Studio Zid | Zaposleni",
    description: "Studio Zid - Stranica za upravljanje zaposlenima",
};

export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
        <div>
            {children}
        </div>
    );
}