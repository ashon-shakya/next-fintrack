import { prisma } from "@/src/lib/prisma";

export async function GET() {
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify({ ok: true, users }), { status: 200 });
}
