import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ListContainer } from "./_components/list-container";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      Board: {
        orgId,
      },
    },
    include: {
      Cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });
  console.log(lists);
  return (
    <div className="p-5 h-full space-y-2 overflow-x-auto">
      <ListContainer boardId={params.boardId} data={lists} />
    </div>
  );
};

export default BoardIdPage;
