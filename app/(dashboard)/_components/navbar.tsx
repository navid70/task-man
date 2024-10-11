"use client"

import { Logo } from "@/components/logo";
import { MobileSidebar } from "./mobile-sidebar";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { IconPlus } from "@tabler/icons-react";
import { CreateBoardPopover } from "@/app/(dashboard)/organization/[organizationId]/_components/create-board-popover";
import { Button } from "@mantine/core";

export const Navbar = () => {



  return (
    <nav className="h-14 w-full px-2 md:px-4 flex items-center shadow-md border-b bg-white dark:bg-neutral-800 fixed top-0 z-50">
      <MobileSidebar />
      <div className="flex items-center gap-x-1 sm:gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <CreateBoardPopover side="bottom">
          <Button
            size={"sm"}
            variant={"primary"}
            visibleFrom={"sm"}
            className="py-1.5 px-0.5 sm:px-2"
          >
            Create
          </Button>
        </CreateBoardPopover>
        <CreateBoardPopover side="bottom">
          <Button
            variant={"primary"}
            className="flex items-center justify-center p-0 size-6 rounded-sm"
            hiddenFrom="sm"
          >
            <IconPlus className="h-4 w-4" />
          </Button>
        </CreateBoardPopover>
      </div>
      <div className="flex items-center ml-auto gap-x-2">
        <OrganizationSwitcher

          hidePersonal
          afterCreateOrganizationUrl={"/organization/:id"}
          afterLeaveOrganizationUrl={"/select-org"}
          afterSelectOrganizationUrl={"/organization/:id"}
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            },
          }}
        />
        <UserButton
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
};
