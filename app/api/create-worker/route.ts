import { NextResponse, NextRequest } from "next/server";
import pool from "@/app/utils/db";

export async function POST(req: NextRequest) {
    const { workerName, category, phoneNumber, position, profilePicture } = await req.json();

    if (!workerName || !category || !phoneNumber || !position || !profilePicture) {
        return NextResponse.json({ message: "Sva polja su obavezna" }, { status: 400 });
    }

    let conn;
    try {
        conn = await pool.getConnection();

        const [workerRows] = await conn.query("SELECT * FROM workers WHERE workerName COLLATE utf8mb4_unicode_ci = ?", [workerName]);
        if ((workerRows as any).length > 0) {
            return NextResponse.json({ message: "Radnik već postoji u bazi" }, { status: 400 });
        }
        const categoryJSON = JSON.stringify(category);

        await conn.query(
            "INSERT INTO workers (workerName, categories, phoneNumber, position, profilePicture) VALUES (?, ?, ?, ?, ?)",
            [workerName, categoryJSON, phoneNumber, position, profilePicture]
        );

        return NextResponse.json({ message: "Radnik je uspešno kreiran" }, { status: 200 });
    } catch (err) {
        console.error("Greška prilikom kreiranja radnika:", err);
        return NextResponse.json({ message: "Došlo je do greške, pokušajte ponovo" }, { status: 500 });
    } finally {
        if (conn) conn.release();
    }
}