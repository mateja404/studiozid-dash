import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/utils/db";

export async function GET(req: NextRequest) {
    let conn;
    try {
        conn = await pool.getConnection();
        const [finishedRows] = await conn.query("SELECT COUNT(*) AS finished FROM projects WHERE finished = 'Završen'");
        const [unfinishedRows] = await conn.query("SELECT COUNT(*) AS unfinished FROM projects WHERE finished = 'U toku'");
        const [projectsCount] = await conn.query("SELECT COUNT(*) AS count FROM projects");

        return NextResponse.json({ finishedCount: finishedRows, unfinishedCount: unfinishedRows, projectsCount: projectsCount }, { status: 200 });
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.release();
    }
}