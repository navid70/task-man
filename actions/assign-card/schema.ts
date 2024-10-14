import * as z from "zod";

export const AssignCard = z.object({
  id: z.string(),
  boardId: z.string(),
  assignedUserId: z.string(),
  assignedUserName: z.string(),
  assignedUserImage: z.string(),
});
