import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";
import React from "react";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full">
      <Navbar />
      <main className="h-full pt-32 pb-20">{children}</main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
