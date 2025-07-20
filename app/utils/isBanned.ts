import pool from "./db";

export async function isDeviceBanned(deviceId: string | undefined): Promise<boolean> {
    if (!deviceId) return false;

    let conn;

    try {
        conn = await pool.getConnection();

        const [rows] = await conn.execute("SELECT banned FROM devices WHERE device_id = ? LIMIT 1", [deviceId]);
        const result = rows[0];
        return result?.banned === 1 || result?.banned === true;
    } catch (error) {
        console.error("DB error:", error);
        return false;
    } finally {
        if (conn) conn.release();
    }
}