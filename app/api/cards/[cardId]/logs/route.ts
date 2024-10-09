import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { ENTITY_TYPE } from "@prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { orgId, userId } = auth();

    if (!orgId || !userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const auditLogs = await db.auditLog.findMany({
      where: {
        orgId,
        entityId: params.cardId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    return NextResponse.json(auditLogs);
  } catch (error) {
    console.log("ACTIVIY LOGS ERROR: ", error);
    return new NextResponse("Internal Server Error!", { status: 500 });
  }
}
