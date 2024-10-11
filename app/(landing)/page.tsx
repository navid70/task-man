import { cn } from "@/lib/utils"
import Link from "next/link";
import { Merriweather } from "next/font/google";
import { Button } from "@/components/Button";

const merriweather = Merriweather({
  subsets: ["latin"],
  display: "auto",
  weight: ["300", "400", "700", "900"],
});

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col px-8 sm:px-20 md:px-36">
      <div className="flex items-center justify-center flex-col gap-3">
        <div className="mt-3 mb-1">
          <h1
            className={cn(
              "text-3xl md:text-6xl text-center bg-gradient-to-br from-rose-400 to-purple-500 text-transparent bg-clip-text font-extrabold",
              merriweather.className
            )}
          >
            Task Man
          </h1>
          <h2 className="text-center font-semibold">
            speedup your workflow with task man
          </h2>
        </div>

        <Button
          variant={"filled"}
          className="hover:bg-gray-700 font-semibold mt-10"
        >
          <Link href={"/sign-in"}>Get Started!</Link>
        </Button>
      </div>
    </div>
  );
};

export default MarketingPage;
