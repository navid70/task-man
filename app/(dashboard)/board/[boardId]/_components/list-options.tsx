"use client";

import { List } from "@prisma/client";
import { useAction } from "@/hooks/use-action";
import { deleteList } from "@/actions/delete-list";
import toast from "react-hot-toast";
import { ElementRef, useRef } from "react";
import { copyList } from "@/actions/copy-list";
import { Button, Divider, Popover, PopoverDropdown, PopoverTarget } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted!`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" copied!`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeDelete({ id, boardId });
  };

  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeCopy({ id, boardId });
  };

  return (
    <Popover position={"bottom-start"}>
      <PopoverTarget>
        <Button variant={"subtle"} className="h-auto w-auto p-2">
          <IconDots className="h-4 w-4" />
        </Button>
      </PopoverTarget>
      <PopoverDropdown className="px-0 py-3 ">
        <div className="text-sm font-medium text-center pb-4">
          List Actions
        </div>

        <Button
          onClick={onAddCard}
          variant={"ghost"}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
        >
          Add Card
        </Button>
        <Divider my={'xs'} className="bg-neutral-500 " />

        <form action={onCopy}>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <Button
            variant="outline"
            type="submit"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Copy List
          </Button>
        </form>
        <Divider my={'xs'} className="bg-neutral-500 " />
        <form action={onDelete}>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <Button
            variant="outline"
            type="submit"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Delete this List
          </Button>
        </form>
      </PopoverDropdown>
    </Popover>
  );
};
