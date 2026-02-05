import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { type, amount, description, category, date } = body;

    if (!type || !amount || !category || !date) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }

    const parsedDate = new Date(date);
    const month = parsedDate.getMonth() + 1; // 1–12

    try {
        const record = await prisma.record.create({
            data: {
                type,
                amount,
                description,
                category,
                date: parsedDate,
                month,
                user: {
                    connect: {
                        email: session.user.email,
                    },
                },
            },
        });

        return NextResponse.json(record, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to create record" },
            { status: 500 }
        );
    }
}
