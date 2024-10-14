import { ACTION, AuditLog } from "@prisma/client";

export const generateLogMessage = (log: AuditLog): string => {
  const { action, entityTitle, entityType, assignedUserName } = log;

  switch (action) {
    case ACTION.CREATE:
      return `Created ${entityType.toLowerCase()} "${entityTitle}".`;
    case ACTION.UPDATE:
      return `Updated ${entityType.toLowerCase()} "${entityTitle}".`;
    case ACTION.DELETE:
      return `Deleted ${entityType.toLowerCase()} "${entityTitle}".`;
    case ACTION.ASSIGN:
      return `Assigned ${entityType.toLowerCase()} "${entityTitle}" to ${assignedUserName}.`;
    default:
      return `Unknown action ${entityType.toLowerCase()} "${entityTitle}".`;
  }
};
