import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/utils/db";

export async function GET(req: NextRequest) {
    let conn;
    try {
        conn = await pool.getConnection();
        const currentYear = new Date().getFullYear();
        const [incomeRows] = await conn.query(`SELECT mesec, COALESCE(SUM(budget),0) AS prihod FROM (SELECT 1 AS mesec UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12) AS meseci LEFT JOIN projects ON MONTH(start_date) = meseci.mesec AND YEAR(start_date) = ${currentYear} GROUP BY mesec ORDER BY mesec;\n`);
        return NextResponse.json({ incomes: incomeRows }, { status: 200 });
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.release();
    }
}