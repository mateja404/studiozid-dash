import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/utils/db";

export async function POST(req: NextRequest) {
    const { ip, os, browser } = await req.json();
    if (!ip || !os || !browser) {
        return NextResponse.json({ message: "Svi parametri su potrebni" }, { status: 200 });
    }

    const osName = os?.name || "";
    const osVersion = os?.version || "";
    const browserName = browser?.name || "";
    const browserVersion = browser?.version || "";
    let conn;
    try {
        conn = await pool.getConnection();
        const [deviceRows] = await conn.query("INSERT INTO devices (ip_address, os, browser) VALUES(?, ?, ?)", [ip, `${osName} ${osVersion}`, `${browserName} ${browserVersion}`]);
        return NextResponse.json({ message: "success" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Greška prilikom unosa uređaja" }, { status: 500 });
    } finally {
        if (conn) conn.release();
    }
}