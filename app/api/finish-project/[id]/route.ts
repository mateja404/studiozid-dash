import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/utils/db";

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
    const { id }: any = context.params;
    const status = 'Završen';
    let conn;

    try {
        conn = await pool.getConnection();
        const [rows] = await conn.query("UPDATE projects SET finished = ? WHERE id = ?", [status, id]);

        return NextResponse.json({ message: "Čestitamo! Uspešno ste završili projekat" }, { status: 200 });
    } catch (err) {
        console.log(err);
    }
}