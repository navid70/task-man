"use client";

import Image from "next/image";

import { useOrganization } from "@clerk/nextjs";
import { Skeleton } from "@mantine/core";
import { IconCreditCard } from "@tabler/icons-react";


export const Info = () => {
  const { organization, isLoaded } = useOrganization();
  console.log(isLoaded);

  if (!isLoaded) {
    return <Info.Skeleton />;
  }

  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Image
          fill
          sizes={"inherit"}
          src={organization?.imageUrl!}
          alt="Organization"
          className="rounded-lg object-cover"
        />
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-xl text-muted">{organization?.name}</p>
        <div className="flex items-center text-xs text-muted">
          <IconCreditCard className="h-3 w-3 mr-1" />
          {"Free"}
        </div>
      </div>
    </div>
  );
};

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Skeleton width={"100%"} height={"60px"} className="w-full h-full absolute" />
      </div>
      <div className="space-y-2">
        <Skeleton width={200} height={40} />
        <div className="flex items-center">
          <Skeleton width={20} height={14} className="mr-1" />
          <Skeleton width={100} height={16} />
        </div>
      </div>
    </div>
  );
};
