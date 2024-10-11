"use client";

import { CreateOrganization, useOrganization, useOrganizationList } from "@clerk/nextjs";

import { NavItem, Organization } from "./nav-item";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { Accordion, Modal, Skeleton } from "@mantine/core";
import { Button } from "@/components/Button";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

interface SidebarProps {
  storageKey?: string;
}

export const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, boolean>>({
    key: storageKey,
    defaultValue: {}
  });
  const [opened, { close, open }] = useDisclosure(false);
  const router = useRouter();

  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();

  const { userMemberships, isLoaded: isLoadedOrgList, setActive } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }

      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="font-medium text-xs flex items-center justify-between mb-3 rounded-lg">
        <span className="pl-4">Workspaces</span>
        <Button

          type="button"
          size={"icon"}
          variant={"ghost"}
          className="group w-full flex justify-end pr-2"
        >
          <Button className="w-full" fullWidth={false} onClick={open}>
            <IconPlus className="h-4 w-4 group-hover:text-rose-100" />
          </Button>
        </Button>
      </div>
      <Accordion
        multiple={true}
        defaultValue={defaultAccordionValue}
        className="space-y-2"
        variant={"separated"}
      >
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization as Organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>

      <Modal opened={opened} size={'md'} onClose={close}
      classNames={{
        body:'!p-0 !m-0',
        content:'!p-0 !m-0',
        root:'!p-0 !m-0',
      }}
      >
        <div className="w-fit mx-auto">
          <CreateOrganization
            appearance={{
              elements: {
                rootBox: {
                  width: "100%",
                }
              }
            }}
            afterCreateOrganizationUrl={(org) => {
              close();
              userMemberships.revalidate();
              revalidatePath('/organization/[organizationId]', 'page');
              setActive({ organization: org.id }).then(() => {
                router.push(`/organization/${org.id}`);
              });
              router.push(`/organization/${org.id}`);
              return `/organization/:id`;
            }}
          />
        </div>
      </Modal>
    </>
  );
};
