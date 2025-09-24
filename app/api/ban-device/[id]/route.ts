import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/utils/db";

export async function PATCH(
  req: NextRequest,
  context: { params: any }
) {
    const { id } = context.params;
    const deviceId = parseInt(id, 10);

    let conn;
    try {
        conn = await pool.getConnection();
        const [rows] = await conn.query("UPDATE devices SET banned = 1 WHERE id = ?", [deviceId]);
        return NextResponse.json({ message: "Uređaj je banovan" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Došlo je do greške" }, { status: 500 });
    } finally {
        if (conn) conn.release();
    }
}