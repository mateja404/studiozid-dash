import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import pool from "@/app/utils/db";

export async function POST(req: NextRequest) {
    const { worker_name, budget, address, start_date, end_date, payment_status } = await req.json();

    if (!address) {
        return new NextResponse("Adresa je obavezna", { status: 400 });
    }
    if (!worker_name || !budget || !start_date || !end_date || !payment_status) {
        return  NextResponse.json({ message: "Sva polja su obavezna!" }, { status: 400 });
    }

    let conn;
    try {
        conn = await pool.getConnection();

        const apiKey = process.env.OPENCAGE_API;
        if (!apiKey) {
            return new NextResponse("API ključ nije pronađen", { status: 500 });
        }

        const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
            params: {
                q: address,
                key: apiKey,
            },
        });

        const data = response.data;

        if (data.results.length === 0) {
            return new NextResponse("Adresa nije pronađena", { status: 404 });
        }

        const { lat, lng } = data.results[0].geometry;
        await conn.query(
            "INSERT INTO projects (worker_name, budget, address, lng, lat, start_date, end_date, payment_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [worker_name, budget, address, lng, lat, start_date, end_date, payment_status]
        );

        return NextResponse.json({ message: "Uspešno ste kreirali projekat" }, { status: 200 });
    } catch (error) {
        console.error("Greška pri kreiranju projekta:", error);
        return new NextResponse("Serverska greška", { status: 500 });
    } finally {
        if (conn) conn.release();
    }
}
