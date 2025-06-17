import { NextResponse, NextRequest } from "next/server";
import pool from "@/app/utils/db";

export async function DELETE(req: NextRequest) {
    const { id } = await req.json();

    if (!id) {
        return NextResponse.json({ message: "Nema pronađenog ID-a" }, { status: 400 });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const [result]: any = await conn.query("DELETE FROM workers WHERE id = ?", [id]);

        if (result.affectedRows > 0) {
            return NextResponse.json({ message: "Zaposleni uspešno obrisan." }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Zaposleni nije pronađen." }, { status: 404 });
        }
    } catch (error) {
        console.error("Greška prilikom brisanja:", error);
        return NextResponse.json({ message: "Greška na serveru." }, { status: 500 });
    } finally {
        if (conn) conn.release();
    }
}