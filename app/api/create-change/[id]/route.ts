import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/utils/db";

export async function POST(req: NextRequest, context: { params: { id: string } }) {
    const { id }: any = context.params;
    const { change }: any = await req.json();
    let conn;

    try {
        conn = await pool.getConnection();
        const [rows] = await conn.query("INSERT INTO project_changes (project_id, change_description) VALUES (?, ?)", [id, change]);

        return NextResponse.json({ message: "Uspešno ste dodali promenu" }, { status: 200 });
    } catch (error) {
        console.log("Error:", error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    } finally {
        if (conn) conn.release();
    }
}