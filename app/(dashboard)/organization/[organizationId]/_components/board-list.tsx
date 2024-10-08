// import { FormPopover } from "@/components/form/form-popover";
// import { Hint } from "@/components/hint";
import { db } from "@/lib/db";
// import { getAvailableCount } from "@/lib/org-limit";
// import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs/server";
// import { HelpCircle, User2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Skeleton, Tooltip } from "@mantine/core";
import { IconHelpCircle, IconUser } from "@tabler/icons-react";
import { CreateBoardPopover } from "@/app/(dashboard)/organization/[organizationId]/_components/create-board-popover";

export const BoardList = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return redirect("/select-org");
  }

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });


  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-white">
        <IconUser className="h-6 w-6 mr-2" />
        Your Boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
            className="group border-[1px] border-sky-200 relative aspect-video shrink-0 bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden hover:scale-110 transition"
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            <p className="relative font-semibold text-muted">{board.title}</p>
          </Link>
        ))}
        <CreateBoardPopover sideOffset={10} side="right">
          <div
            role="button"
            className="aspect-video shrink-0 relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-90 hover:scale-110 transition"
          >
            <p className="text-sm">Create New Board</p>
            <span className="text-xs">
               remaining
            </span>
            <Tooltip
              offset={40}
              label={`
          Free workspaces can have upto 5 Boards only. Upgrade to Pro for more Boards.
          `}
            >
              <IconHelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Tooltip>
          </div>
        </CreateBoardPopover>
      </div>
    </div>
  );
};

BoardList.Skeleton = function BoardListSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 ">
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};
