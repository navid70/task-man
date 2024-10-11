"use client";

import { ElementRef, useRef, useState } from "react";
import { Board } from "@prisma/client";
import { useAction } from "@/hooks/use-action";
import { updateBoard } from "@/actions/update-board";
import toast from "react-hot-toast";
import { Input } from "@mantine/core";
import { Button } from "@/components/Button";

interface BoardTitleFormProps {
  data: Board;
}

export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board ${data.title} updated!`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

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

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({
      title,
      id: data.id,
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className=""
      >
        <Input

          id="title"
          name={'title'}
          ref={inputRef}
          onBlur={onBlur}
          variant={"unstyled"}
          defaultValue={title}
          size={'sm'}
          className="text-lg font-bold px-2 p-1 h-10"
        />
      </form>
    );
  }
  return (
    <Button
      color={'white'}
      onClick={enableEditing}
      variant={"transparent"}
      size={'sm'}
      className="font-bold text-lg !h-10 p-1 px-1"
    >
      {title}
    </Button>
  );
};
