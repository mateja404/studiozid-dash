import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/utils/db";

export async function PATCH(req: NextRequest, context: { params: any }) {
    const { id }: any = context.params;
    let conn;
    try {
        conn = await pool.getConnection();
        const [rows] = await conn.query("UPDATE devices SET banned = 0 WHERE id = ?", [id]);
        return NextResponse.json({ message: "Uređaj je unbanovan" }, { status: 200 });
    } catch (error) {
        console.log(error);
    }
}