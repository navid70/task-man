"use client";

import { createCard } from "@/actions/create-card";

import { useAction } from "@/hooks/use-action";
import { useParams } from "next/navigation";
import { forwardRef, KeyboardEventHandler } from "react";
import toast from "react-hot-toast";
import { Button, Textarea } from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useClickOutside, useEventListener } from "@mantine/hooks";

interface CardFormProps {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
    const params = useParams();

    const { execute, fieldErrors,isLoading } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" created!`);
        formRef.current?.reset();
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

    const formRef = useClickOutside(disableEditing);
    useEventListener("keydown", onKeyDown);

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();

        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const boardId = params.boardId as string;

      execute({ title, listId, boardId });
    };

    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={onSubmit}
          className="m-1 py-0.5 px-1 space-y-4 "
        >
          <Textarea
            id="title"
            name="title"
            onKeyDown={onTextareaKeyDown}
            ref={ref}
            error={fieldErrors?.title}
            placeholder="Enter a title for this card..."
          />

          <div className="flex justify-between items-center gap-x-1">
            <Button size={'xs'} loading={isLoading} type={'submit'}>Add card</Button>
            <Button size={"xs"} variant={"outline"} onClick={disableEditing}>
              <IconX className="size-5" />
            </Button>
          </div>
        </form>
      );
    }
    return (
      <div className="pt-2 px-2 ">
        <Button
          size={"sm"}
          variant={"ghost"}
          onClick={enableEditing}
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
        >
          <IconPlus className="h-4 w-4 mr-2" />
          Add a Card
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";
