"use client";

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";
import { useCardModal } from "@/hooks/use-card-modal";
import Image from "next/image";

interface CardItemProps {
  data: Card;
  index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
  const cardModal = useCardModal();

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => cardModal.onOpen(data.id)}
          className="border-2 relative bg-white dark:bg-neutral-900 border-transparent hover:border-black py-2 px-3 text-sm rounded-md shadow-md mb-3"
        >
          {data.assignedUserImage && <div className="absolute right-0 size-6 -bottom-2 z-0">
            <Image src={data.assignedUserImage} alt={'user'}
                   fill className={"!rounded-full"}
            />
          </div>}
          <p className="truncate">{data.title}</p>
        </div>
      )}
    </Draggable>
  );
};
