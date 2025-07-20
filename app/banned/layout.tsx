import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Studio Zid | Ban",
    description: "Studio Zid - Banovan si",
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