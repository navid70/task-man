"use client";

import { ActivityItem } from "@/components/activity-item";
import { AuditLog } from "@prisma/client";
import { IconActivity } from "@tabler/icons-react";
import { Skeleton } from "@mantine/core";

interface ActivityProps {
  items: AuditLog[];
}

export const Activity = ({ items }: ActivityProps) => {

  console.log(items);
  return (
    <div className="flex items-start gap-x-3 w-full">
      <IconActivity className="size-5 mt-0.5 " />
      <div className="w-full">
        <p className="font-semibold mb-2 ">Activity</p>
        <ol className="mt-2 space-y-4">
          {items?.map((item) => (
            <ActivityItem key={item.id} data={item} />
          ))}
        </ol>
      </div>
    </div>
  );
};

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton width={24} height={24} className="bg-neutral-200 " />
      <div className="w-full">
        <Skeleton width={96} height={16} className="mb-2 bg-neutral-200" />
        <Skeleton width={"100%"} height={40} className="bg-neutral-200" />
      </div>
    </div>
  );
};
