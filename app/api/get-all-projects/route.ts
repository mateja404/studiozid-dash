import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/utils/db";

export async function GET(req: NextRequest) {
    let conn;
    try {
        conn = await pool.getConnection();

        const [projectRows] = await conn.query("SELECT * FROM projects");
        const [projectsCountResult] = await conn.query("SELECT COUNT(*) AS count FROM projects");
        const projectsCount = projectsCountResult[0]?.count || 0;

        return NextResponse.json({ projects: projectRows, projectsCount: projectsCount }, { status: 200 });
    } catch (error) {
        console.log(error);
    }
}