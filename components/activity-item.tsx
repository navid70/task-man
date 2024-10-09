import { AuditLog } from "@prisma/client";
import { format } from "date-fns";
import { generateLogMessage } from "@/lib/generate-log-message";
import { Avatar, AvatarGroup } from "@mantine/core";

interface ActivityItemProps {
  data: AuditLog;
}

export const ActivityItem = ({ data }: ActivityItemProps) => {
  return (
    <li className="flex items-center gap-x-2 ">
      {/*<AvatarGroup className="h-8 w-8">*/}
      {/*  <Avatar  src={data.userImage} />*/}
      {/*</AvatarGroup>*/}
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold lowercase ">
            {data.userName}
          </span>{" "}
          {generateLogMessage(data)}
        </p>
        <p className="text-xs text-muted-foreground">
          {format(new Date(data.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </li>
  );
};
