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
        // toastOptions={{
        //   duration: 2300,
        //   style: {
        //     direction: 'ltr',
        //     borderRadius: 50,
        //     padding: "6px 12px",
        //     fontSize: 13,
        //     fontWeight: 700,
        //     background: "#F9F9FB",
        //     border: "3px solid #ffffff",
        //     width: "100%",
        //     maxWidth: "max-content",
        //     boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.15)",
        //   },
        // }}
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
