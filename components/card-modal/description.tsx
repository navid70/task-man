"use client";

import { updateCard } from "@/actions/update-card";

import { useAction } from "@/hooks/use-action";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";

import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { useClickOutside, useEventListener } from "@mantine/hooks";
import toast from "react-hot-toast";
import { IconAlignLeft } from "@tabler/icons-react";
import { Skeleton, Textarea } from "@mantine/core";
import { Button } from "@/components/button";

interface DescriptionProps {
  data: CardWithList;
}

export const Description = ({ data }: DescriptionProps) => {
  const queryClient = useQueryClient();
  const params = useParams();

  const [isEditing, setIsEditing] = useState(false);

  const textareaRef = useRef<ElementRef<"textarea">>(null);


  const enableEditing = () => {
    setIsEditing(true);

    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  const formRef = useClickOutside(disableEditing);

  const { execute, fieldErrors,isLoading } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });

      toast.success(`Card 
"${data.title}" updated!`);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;
    const boardId = params.boardId as string;

    execute({ id: data.id, boardId, description });
  };

  return (
    <div className="flex items-start gap-x-3 w-full">
      <IconAlignLeft className="h-5 w-5 mt-0.5" />
      <div className="w-full">
        <p className="font-semibold mb-2">Description</p>
        {isEditing ? (
          <form action={onSubmit} ref={formRef} className="space-y-2">
            <Textarea
              id="description"
              name="description"
              ref={textareaRef}
              className="w-full my-2"
              placeholder="Add a more detailed description..."
              defaultValue={data.description || undefined}
              error={fieldErrors?.title}
            />
            <div className="flex items-center gap-x2 ">
              <Button loading={isLoading} size={'xs'} type={'submit'}>Save</Button>
              <Button
                type="button"
                onClick={disableEditing}
                size={"xs"}
                variant={"subtle"}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            role="button"
            className="min-h-[78px] bg-neutral-200 dark:bg-neutral-700 text-sm font-medium py-3 px-3.5 rounded-md"
          >
            {data.description || "Add a more detailed description..."}
          </div>
        )}
      </div>
    </div>
  );
};

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton width={24} height={24} className="bg-neutral-200" />
      <div className="w-full">
        <Skeleton width={96} height={24} className="mb-2 bg-neutral-200" />
        <Skeleton width={"100%"} height={70} className="bg-neutral-200" />
      </div>
    </div>
  );
};
