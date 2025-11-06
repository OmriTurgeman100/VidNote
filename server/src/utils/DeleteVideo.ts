import path from "path";
import { promises as fs } from "fs";

const uploadsDir = path.resolve(__dirname, "..", "..", "uploads");

export async function deleteFile(filename: string) {
    try {

        if (!filename) return;
        const filePath = path.join(uploadsDir, filename);

        await fs.unlink(filePath);

    } catch (error) {
        console.error(error)
    }
}
