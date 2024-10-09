import { Logo } from "@/components/logo";
import Link from "next/link";
import { Button } from "@mantine/core";

export const Navbar = () => {
  return (
    <div
      className="fixed top-0 w-full h-12 px-4 border-b dark:border-b-neutral-700 shadow-md bg-current dark:bg-neutral-900 flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 w-full md:w-auto md:block flex items-center justify-between">
          <Button size={"xs"} variant={"outline"} component={Link} href={"/sign-in"}>
            Login
          </Button>
          <Button size={"xs"} component={Link} href={"/sign-up"}>
            Get Started!
          </Button>
        </div>
      </div>
    </div>
  );
};
