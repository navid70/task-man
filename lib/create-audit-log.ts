import { auth, currentUser } from "@clerk/nextjs/server";

import { db } from "./db";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

interface Props {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
  userName?: string;
}

export const createAuditLog = async (props: Props) => {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!orgId || !user) {
      throw new Error("User not found! ");
    }

    const { entityId, entityType, entityTitle, action, userName } = props;

    await db.auditLog.create({
      data: {
        orgId,
        entityId,
        entityType,
        entityTitle,
        action,
        assignedUserName: userName,
        userId: user.id,
        userImage: user?.imageUrl,
        userName:
          (user?.firstName ? user?.firstName : "User") +
          " " +
          (user?.lastName ? user?.lastName : ""),
      },
    });
  } catch (error) {
    console.log("Audit Log Error", error);
  }
};
