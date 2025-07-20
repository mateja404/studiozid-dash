import { NextResponse } from "next/server";
import pool from "@/app/utils/db";

export async function GET() {
    let conn;
    try {
        conn = await pool.getConnection();
        return NextResponse.json({ message: "eee" }, { status: 200 });
    } catch (err) {
        console.log(err);
    }
}