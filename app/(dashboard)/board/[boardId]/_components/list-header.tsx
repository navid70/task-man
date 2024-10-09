"use client";

import { updateList } from "@/actions/update-list";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { useState, useRef, ElementRef } from "react";
import toast from "react-hot-toast";
import { ListOptions } from "./list-options";
import { useEventListener } from "@mantine/hooks";
import { Input, TextInput } from "@mantine/core";

interface ListHeaderProps {
  data: List;
  onAddCard: () => void;
}

export const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed to "${data.title}"`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = data.id.toString() as string;
    const boardId = data.boardId.toString() as string;

    if (title === data.title) {
      return disableEditing();
    }

    execute({
      title,
      id,
      boardId,
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  const ref = useEventListener("keydown", onKeyDown);

  return (
    <div ref={ref} className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form ref={formRef} action={handleSubmit} className="flex-1 px-[2px]">
          <Input
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            name="title"
            placeholder="Enter list title..."
            defaultValue={title}
            variant={"unstyled"}
            size={'xs'}
            className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:!bg-neutral-700/50"
          />
          <button type="submit" hidden />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
        >
          {data.title}
        </div>
      )}
      <ListOptions data={data} onAddCard={onAddCard} />
    </div>
  );
};
