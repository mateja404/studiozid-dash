import { NextResponse } from "next/server";
import pool from "@/app/utils/db";

export async function GET() {
    let conn;
    try {
        conn = await pool.getConnection();
        const [devices] = await conn.query("SELECT * FROM devices");
        const [devicesCount] = await conn.query("SELECT COUNT(*) AS deviceCount FROM devices");
        return NextResponse.json({ devices: devices, devicesCount: devicesCount }, { status: 200 });
    } catch (err) {
        console.log(err);
    }
}