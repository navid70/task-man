"use client";

import { useState, useRef, ElementRef } from "react";

import { ListWrapper } from "./list-wrapper";

import { useParams, useRouter } from "next/navigation";

import { createList } from "@/actions/create-list";
import { useAction } from "@/hooks/use-action";
import toast from "react-hot-toast";
import { useClickOutside, useEventListener } from "@mantine/hooks";
import { TextInput } from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons-react";
import { Button } from "@/components/button";

export const ListForm = () => {
  const params = useParams();
  const router = useRouter();

  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" created!`);
      disableEditing();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  const formRef = useClickOutside(disableEditing);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;

    execute({
      title,
      boardId,
    });
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md space-y-4 bg-white dark:bg-neutral-700 shadow-md"
        >
          <TextInput
            error={fieldErrors?.title}
            ref={inputRef}
            id="title"
            name="title"
            size={'sm'}
            placeholder="Enter List Title..."
            className="border-transparent hover:border-input focus:border-input transition"
          />

          <div className="flex items-center justify-between mt-8">
            <Button type={"submit"}>Add List</Button>
            <Button variant={"subtle"} size={"sm"} onClick={disableEditing}>
              <IconX className="size-4" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="w-full rounded-md bg-white/80 hover:bg-white/50 dark:bg-neutral-700 dark:hover:bg-neutral-700/50 transition p-3 flex items-center font-medium text-sm"
      >
        <IconPlus className="size-4 mr-2" />
        Add a list
      </button>
    </ListWrapper>
  );
};
