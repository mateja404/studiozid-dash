import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/utils/db";

export async function GET(req: NextRequest, context: { params: any }) {
    const { id } = await context.params;
    let conn;

    try {
        conn = await pool.getConnection();
        const [projectRows] = await conn.query("SELECT * FROM projects WHERE id = ?", [id]);

        const projectRowsWithNumbers = projectRows.map((project: any) => ({
            ...project,
            lat: parseFloat(project.lat),
            lng: parseFloat(project.lng)
        }));

        return NextResponse.json({ projectRows: projectRowsWithNumbers }, { status: 200 });
    } catch (error) {
        console.log("Error:", error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    } finally {
        if (conn) conn.release();
    }
}