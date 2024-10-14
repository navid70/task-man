"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { AssignCard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId } = auth();

  const { id, boardId, assignedUserId, assignedUserImage, assignedUserName } = data;

  let card;

  try {
    card = await db.card.update({
      where: {
        id,
        List: {
          Board: {
            orgId: orgId!,
          },
        },
      },
      data: {
        assignedUserId,
        assignedUserImage,
        assignedUserName
      },
    });

    await createAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.ASSIGN,
      userName: assignedUserName
    });
  } catch (error) {
    return {
      error: "Failed to Copy the Card!",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const assignCard = createSafeAction(AssignCard, handler);
