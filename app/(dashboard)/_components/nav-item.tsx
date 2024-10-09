
import { cn } from "@/lib/utils";
import Image from "next/image";

import { usePathname, useRouter } from "next/navigation";
import { IconActivity, IconLayout, IconSettings } from "@tabler/icons-react";
import { AccordionControl, AccordionItem, AccordionPanel, Button, Skeleton } from "@mantine/core";

export type Organization = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

interface NavItemProps {
  isActive: boolean;
  isExpanded: boolean;
  organization: Organization;
  onExpand: (id: string) => void;
}

export const NavItem = ({
                          isExpanded,
                          isActive,
                          organization,
                          onExpand,
                        }: NavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const routes = [
    {
      label: "Boards",
      icon: <IconLayout className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}`,
    },
    {
      label: "Activity",
      icon: <IconActivity className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: "Settings",
      icon: <IconSettings className="h-4 w-4 mr-2" />,
      href: `/organization/${organization.id}/settings`,
    }
  ];

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <AccordionItem
      value={organization.id}
      className="border-none bg-muted rounded-lg"
    >
      <AccordionControl
        onClick={() => onExpand(organization.id)}
        className={cn(
          "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
          isActive && !isExpanded && "!bg-sky-500/10"
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="size-7 relative">
            <Image
              fill
              sizes="inherit"
              src={organization.imageUrl}
              alt="organization"
              className="rounded-sm object-cover"
            />
          </div>
          <span className="font-medium text-sm">{organization.name}</span>
        </div>
      </AccordionControl>
      <AccordionPanel className="pt-1 text-neutral-700">
        <div className="flex flex-col gap-4">
          {routes.map((route) => (
            <Button
              key={route.href}
              size={"sm"}
              autoContrast={true}
              variant={pathname === route.href ? "filled" :"subtle"}
              fullWidth
              onClick={() => onClick(route.href)}
              className={cn(
                "!w-full font-normal !flex !justify-start pl-10 hover:bg-gray-200",
                pathname === route.href && "font-semibold"
              )}
            >
              {route.icon}
              {route.label}
            </Button>
          ))}
        </div>
      </AccordionPanel>
    </AccordionItem>
  );
};

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="w-10 h-10 relative shrink-0">
        <Skeleton className="h-full w-full absolute" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
