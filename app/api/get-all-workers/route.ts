import { NextResponse, NextRequest } from "next/server";
import pool from "@/app/utils/db";

export async function GET(req: NextRequest) {
    let conn;
    try {
        conn = await pool.getConnection();
        const [workersRow] = await conn.query("SELECT * FROM workers");
        const [workersCountResult] = await conn.query("SELECT COUNT(*) AS count FROM workers");
        const workersCount = workersCountResult[0]?.count || 0;
        conn.release();
        return NextResponse.json({ workers: workersRow, workersCount: workersCount });
    } catch(error) {
        console.log(error)
    }
}