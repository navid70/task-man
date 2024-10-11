"use client";

import { deleteBoard } from "@/actions/delete-board";

import { useAction } from "@/hooks/use-action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Popover, PopoverDropdown, PopoverTarget } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { Button } from "@mantine/core";

interface BoardOptionsProps {
  id: string;
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const router = useRouter();
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error);
      router.push("/");
    },
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" deleted!`);
      router.push("/");
    },
  });

  const onDelete = () => {
    execute({ id });
  };

  return (
    <div>
      <Popover position={"bottom-start"}>
        <PopoverTarget>
          <Button color={'white'} variant={"transparent"} className="h-auto w-auto p-2">
            <IconDots className="h-4 w-4 " />
          </Button>
        </PopoverTarget>
        <PopoverDropdown className="px-0 pt-3 pb-3">
          <div className="text-sm font-medium text-center pb-4">
            Board Actions
          </div>
          <Button
            variant={"outline"}
            loading={isLoading}
            onClick={onDelete}
            className="rounded-none w-full h-auto"
          >
            Delete This Board
          </Button>
        </PopoverDropdown>
      </Popover>
    </div>
  );
};
