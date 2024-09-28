import Image from "next/image";
import { Button } from "@mantine/core";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full p-4 border-t dark:border-t-gray-700 bg-slate-100 dark:bg-neutral-900">
      <div className="md:max-w-screen-2xl mx-auto flex flex-col sm:flex-row items-center w-full justify-between">
        <p className="text-md">
          All rights are reserved. &copy;
          <span className="font-semibold">Navid Talebi</span>
        </p>
        <div className="space-x-4 w-full md:w-auto md:block flex justify-center">
          {/*<Button size={"sm"} variant={"light"}>*/}
          {/*  Privacy Policy!*/}
          {/*</Button>*/}
          {/*<Button size={"sm"} variant={"light"}>*/}
          {/*  Terms of Service.*/}
          {/*</Button>*/}
        </div>
      </div>
    </div>
  );
};
