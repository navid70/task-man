"use client";

import { updateCard } from "@/actions/update-card";

import { useAction } from "@/hooks/use-action";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";

import { useParams } from "next/navigation";
import { ElementRef, useRef } from "react";
import toast from "react-hot-toast";
import { IconAlignLeft, IconUserPin } from "@tabler/icons-react";
import { Select, Skeleton } from "@mantine/core";
import { assignCard } from "@/actions/assign-card";
import { PublicUserData } from "@clerk/types";

interface DescriptionProps {
  data: CardWithList;
  members: PublicUserData[];
}

export const Assignment = ({ data, members }: DescriptionProps) => {
  const queryClient = useQueryClient();
  const formRef = useRef<ElementRef<"form">>(null);
  const params = useParams();
  console.log(members);
  const textareaRef = useRef<ElementRef<"textarea">>(null);


  const { execute, isLoading } = useAction(assignCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });

      toast.success(`Card "${data.title}" assigned to ${data.assignedUserName}`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onChange = () => {
    setTimeout(() => {
      formRef.current?.requestSubmit();
    }, 100);

  };

  const onSubmit = (formData: FormData) => {
    const assignment = formData.get("assignment") as string;
    const boardId = params.boardId as string;

    const selectedUser = members.find(e => e.userId === assignment)!;

    execute({
      id: data.id,
      boardId,
      assignedUserId: selectedUser.userId!,
      assignedUserImage: selectedUser.imageUrl,
      assignedUserName: selectedUser.firstName + " " + selectedUser.lastName
    });
  };

  return (
    <div className="flex items-start gap-x-3 w-full">
      <IconUserPin className="size-5 mt-0.5" />
      <div className="w-full">
        <p className="font-semibold mb-2">assign</p>

        <form ref={formRef} action={onSubmit} className="">
          <Select
            id="assignment"
            name="assignment"
            defaultValue={data.assignedUserId || undefined}
            data={members.map(e => ({ label: e.firstName + " " + e.lastName, value: (e.userId || "") }))}
            size={'sm'}
            disabled={isLoading}
            allowDeselect={false}
            onChange={onChange}
            placeholder={'Select a user'}
          />
        </form>

      </div>
    </div>
  );
};

Assignment.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton width={24} height={24} className="bg-neutral-200" />
      <div className="w-full">
        <Skeleton width={96} height={24} className="mb-2 bg-neutral-200" />
        <Skeleton width={"100%"} height={40} className="bg-neutral-200" />
      </div>
    </div>
  );
};
