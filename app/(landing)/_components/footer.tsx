// import Image from "next/image";
// import { Button } from "@mantine/core";

import { IconBrandGithub } from "@tabler/icons-react";
import { ActionIcon } from "@mantine/core";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full p-4 border-t dark:border-t-gray-700 bg-slate-100 dark:bg-neutral-900">
      <div className="md:max-w-screen-2xl gap-2 mx-auto flex flex-col sm:flex-row items-center w-full">
        <p className="text-md">
          All rights are reserved. &copy;
          <span className=" mx-1 font-bold">Navid Talebi</span>
        </p>

        <ActionIcon radius={'md'} component={'a'} href={"https://github.com/navid70/task-man"} target={"_blank"}
                    variant={"default"} p={4} size={'md'}>
          <IconBrandGithub />
        </ActionIcon>
      </div>
    </div>
  );
};
