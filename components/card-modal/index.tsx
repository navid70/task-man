"use client";

import { useCardModal } from "@/hooks/use-card-modal";
import { CardWithList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Header } from "./header";
import { Description } from "./description";
import { Actions } from "./actions";
import { AuditLog } from "@prisma/client";
import { Activity } from "./activity";
import axios from "axios";
import { Modal } from "@mantine/core";
import { useShallow } from "zustand/react/shallow";
import { useOrganization } from "@clerk/nextjs";
import { Assignment } from "./assignment";

export const CardModal = () => {
  const { id, isOpen, onClose } = useCardModal(useShallow((state) => ({
    id: state.id,
    isOpen: state.isOpen,
    onClose: state.onClose,
  })));

  const { memberships } = useOrganization({
    memberships: { infinite: true }
  });

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/cards/${id}`);
      return data;
    },
  });

  const { data: auditLogsData } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/cards/${id}/logs`);
      return data;
    },
  });

  return (
    <Modal opened={isOpen} onClose={onClose}>
      <>
        {cardData ? <Header data={cardData} /> : <Header.Skeleton />}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {cardData ? (
                <Description data={cardData} />
              ) : (
                <Description.Skeleton />
              )}
              {(cardData && memberships?.data) ? (
                <Assignment data={cardData} members={memberships.data.map(e => e.publicUserData)} />
              ) : (
                <Assignment.Skeleton />
              )}
              {auditLogsData ? (
                <Activity items={auditLogsData} />
              ) : (
                <Activity.Skeleton />
              )}
            </div>
          </div>
          {cardData ? <Actions data={cardData} /> : <Actions.Skeleton />}
        </div>
      </>
    </Modal>
  );
};
