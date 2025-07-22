import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/utils/db";

export async function PATCH(req: NextRequest, context: { params: { id: number } }) {
    const { id }: any = context.params;
    let conn;
    try {
        conn = await pool.getConnection();
        const [rows] = await conn.query("UPDATE devices SET banned = 1 WHERE id = ?", [id]);
        return NextResponse.json({ message: "Uređaj je banovan" }, { status: 200 });
    } catch (error) {
        console.log(error);
    }
}