// import { Separator } from "@/components/ui/separator";
import { Info } from "./_components/info";
import { Divider } from "@mantine/core";
import { Suspense } from "react";
import { BoardList } from "./_components/board-list";

export default async function OrganizationIdPage() {

  return (
    <div className="w-full mb-20">
      <Info />
      <Divider my={'sm'} />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  );
}
