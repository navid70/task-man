"use client";

import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "./sidebar";
import { Drawer } from "@mantine/core";
import { IconMenu } from "@tabler/icons-react";
import { useShallow } from "zustand/react/shallow";
import { Button } from "@/components/button";

export const MobileSidebar = () => {
  const { isOpen, onOpen, onClose } = useMobileSidebar(useShallow((state) => ({
    isOpen: state.isOpen,
    onOpen: state.onOpen,
    onClose: state.onClose,
  })));

  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Button
        onClick={onOpen}
        variant={"default"}
        size={"sm"}
        hiddenFrom={"sm"}
        className="mr-4"
      >
        <IconMenu className="size-6 shrink-0" />
      </Button>
      <Drawer opened={isOpen} onClose={onClose} position={'left'}>
        <div className="p-2 pt-10">
          <Sidebar storageKey="t-sidebar-mobile-state" />
        </div>
      </Drawer>
    </>
  );
};
