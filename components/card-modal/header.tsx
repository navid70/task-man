"use client";

import { updateCard } from "@/actions/update-card";
import { useAction } from "@/hooks/use-action";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Input, Skeleton } from "@mantine/core";
import { IconLayout } from "@tabler/icons-react";

interface HeaderProps {
  data: CardWithList;
}

export const Header = ({ data }: HeaderProps) => {
  const queryClient = useQueryClient();
  const params = useParams();

  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });

      toast.success(`Renamed to ${data.title}!`);
      setTitle(data.title);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState(data.title);

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;

    if (title === data.title) {
      return;
    }

    execute({
      title,
      boardId,
      id: data.id,
    });
  };

  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <IconLayout className="size-5 mt-[18px]" />
      <div className="w-full">
        <form action={onSubmit}>
          <Input
            id="title"
            name="title"
            ref={inputRef}
            onBlur={onBlur}
            defaultValue={title}
            variant={"unstyled"}
            size={'lg'}
            className="font-semibold text-xl px-1 bg-transparent border-transparent relative left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
          />
        </form>
        <p className="text-sm text-muted-foreground">
          In List <span className="underline">{data.List.title}</span>
        </p>
      </div>
    </div>
  );
};

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton width={24} height={24} className="mt-1 bg-neutral-200" />
      <div>
        <Skeleton width={96} height={24} className="mb-1 bg-neutral-200" />
        <Skeleton width={48} height={16} className="" />
      </div>
    </div>
  );
};
