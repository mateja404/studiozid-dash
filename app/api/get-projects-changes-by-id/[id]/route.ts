import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/utils/db";

export async function GET(req: NextRequest, context: { params: any }) {
    const { id } = await context.params;
    let conn;

    try {
        conn = await pool.getConnection();
        const [projectRows] = await conn.query("SELECT * FROM project_changes WHERE project_id = ? ORDER BY change_date DESC", [id]);

        return NextResponse.json({ projectChanges: projectRows }, { status: 200 });
    } catch (error) {
        console.log("Error:", error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    } finally {
        if (conn) conn.release();
    }
}