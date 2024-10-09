"use client";

import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { useAction } from "@/hooks/use-action";
import { useCardModal } from "@/hooks/use-card-modal";
import { CardWithList } from "@/types";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { Button, Skeleton } from "@mantine/core";
import { IconCopy, IconTrash } from "@tabler/icons-react";

interface ActionsProps {
  data: CardWithList;
}

export const Actions = ({ data }: ActionsProps) => {
  const params = useParams();
  const cardModal = useCardModal();

  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" copied!`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" deleted!`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const onCopy = () => {
    const boardId = params.boardId as string;

    executeCopyCard({
      id: data.id,
      boardId,
    });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;

    executeDeleteCard({
      id: data.id,
      boardId,
    });
  };

  return (
    <div className="space-y-2 mt-2 ">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        variant={"light"}
        size={"sm"}
        onClick={onCopy}
        loading={isLoadingCopy}
        className="w-full justify-start"
      >
        <IconCopy className="size-4 mr-2" /> Copy
      </Button>
      <Button
        variant={"light"}
        size={"sm"}
        onClick={onDelete}
        loading={isLoadingDelete}
        className="w-full justify-start"
      >
        <IconTrash className="size-4 mr-2" /> Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2 ">
      <Skeleton width={80} height={16} className="bg-neutral-200" />
      <Skeleton width={'100%'} height={32} className="bg-neutral-200" />
      <Skeleton width={'100%'} height={32} className="bg-neutral-200" />
    </div>
  );
};
