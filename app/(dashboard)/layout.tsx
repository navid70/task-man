import { Navbar } from "./_components/navbar";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full">
      <Navbar />
      <Toaster
        position="bottom-right"
      />
      <div
        className="h-full w-full bg-cover bg-center overflow-y-auto"
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundAttachment: "sticky",
        }}
      >
        {children}
      </div>
    </div>
  );
}
