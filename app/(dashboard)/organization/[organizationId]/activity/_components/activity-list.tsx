import { ActivityItem } from "@/components/activity-item";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Skeleton } from "@mantine/core";

export const ActivityList = async () => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <ol className="space-y-4 mt-2 bg-muted p-2 rounded-lg max-h-[70vh] overflow-y-auto">
      <p className="hidden last:block text-xs text-center text-muted-foreground">
        No activity found inside this organization.
      </p>
      {auditLogs.map((log) => (
        <ActivityItem key={log.id} data={log} />
      ))}
    </ol>
  );
};

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="space-y-4 mt-4 ">
      <Skeleton width={"80%"} height={56} />
      <Skeleton width={"50%"} height={56} />
      <Skeleton width={"70%"} height={56} />
      <Skeleton width={"80%"} height={56} />
      <Skeleton width={"75%"} height={56} />
      <Skeleton width={"60%"} height={56} />
    </ol>
  );
};
