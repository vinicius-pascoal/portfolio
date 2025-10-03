import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const revalidate = 0; // no-cache in dev

export async function GET() {
  try {
    const dir = path.join(process.cwd(), "public", "projetos");
    let files: string[] = [];
    try {
      files = fs.readdirSync(dir).filter((f) => /\.(png|jpe?g|webp|gif|svg)$/i.test(f));
    } catch (e) {
      files = [];
    }
    return NextResponse.json({ files });
  } catch (e: any) {
    return new NextResponse(e?.message || "Erro interno", { status: 500 });
  }
}
