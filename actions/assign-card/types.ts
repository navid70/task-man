import * as z from "zod";
import { AssignCard } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Card } from "@prisma/client";

export type InputType = z.infer<typeof AssignCard>;
export type ReturnType = ActionState<InputType, Card>;
