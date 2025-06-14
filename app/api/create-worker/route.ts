import { NextResponse, NextRequest } from "next/server";
import pool from "@/app/utils/db";

export async function POST(req: NextRequest){
    const { name, role } = await req.json();
}