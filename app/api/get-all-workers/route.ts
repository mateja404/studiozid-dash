import { NextResponse, NextRequest } from "next/server";
import pool from "@/app/utils/db";

interface Worker {
    workerName: string;
    position: string;
    profilePicture: string;
    categories: string[] | string;
    projectsCount?: number;
}

export async function GET(req: NextRequest) {
    let conn: any;
    try {
        conn = await pool.getConnection();

        const [workersRow] = await conn.query("SELECT * FROM workers");
        const [workersCountResult] = await conn.query("SELECT COUNT(*) AS count FROM workers");
        const workersCount = workersCountResult[0]?.count || 0;

        const parsedWorkers = await Promise.all(workersRow.map(async (worker: any) => {
            if (typeof worker.categories === "string") {
                worker.categories = JSON.parse(worker.categories);
            }
            const [workersProjectsCountResult] = await conn.query("SELECT COUNT(*) AS count FROM projects WHERE worker_name = ? COLLATE utf8mb4_unicode_ci", [worker.workerName]);
            worker.projectsCount = workersProjectsCountResult[0]?.count || 0;

            return worker;
        }));

        conn.release();
        return NextResponse.json({ workers: parsedWorkers, workersCount: workersCount });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'An error occurred while fetching data.' }, { status: 500 });
    }
}