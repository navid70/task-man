import React from "react";
import "./globals.css";
import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import ChangeTheme from "@/components/change-theme";
import { MyClerkProvider } from "@/components/clerk-provider";
import { Notifications } from "@mantine/notifications";


export const metadata = {
  title: {
    default: "task-man",
    template: `%s | "task-man"`,
  },
  description: "manage your task with the superpower of task man",
  icons: [
    {
      url: "/logo.svg",
      href: "/logo.svg",
    },
  ],
};

const theme = createTheme({
  primaryColor: "violet",
  defaultRadius: "lg"
});

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {


  return (
    <html lang="en">
    <head>
      <ColorSchemeScript />
    </head>
    <body>
    <MantineProvider theme={theme} defaultColorScheme={'dark'}>
      <ChangeTheme />
      <Notifications />
      <MyClerkProvider>
        {children}
      </MyClerkProvider>
    </MantineProvider>
    </body>
    </html>
  );
}
