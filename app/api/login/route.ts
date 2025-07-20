"use server";

import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
    const { password } = await req.json();
    if (!password) {
        return NextResponse.json({ message: "Lozinka je obavezna" }, { status: 404 });
    }

    const originalPassword = "$2a$12$db5lupSZqMhLxgMER8TL9OsrpUgpbTFH.3I173sXMnVKDLrGfnAdm";
    const matchingPasswords = await bcrypt.compare(password, originalPassword);
    if (!matchingPasswords) {
        return NextResponse.json({ message: "Pogrešna lozinka" }, { status: 401 });
    }

    const hashedString = btoa("Some random shit bro");
    const payload = { random: hashedString };
    const secretKey = process.env.JWT_SECRET!;
    const token = jwt.sign(payload, secretKey, { expiresIn: '10h' });
    const response = NextResponse.json({ message: "Uspešan login", token: token }, { status: 200 });

    const existingDeviceId = req.cookies.get('device_id');
    if (!existingDeviceId) {
        response.cookies.set({
            name: 'device_id',
            value: uuidv4(),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 365,
        });
    }

    return response;
}