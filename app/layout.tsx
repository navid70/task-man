import React from "react";
import "./globals.css";
import { ColorSchemeScript, createTheme, MantineProvider, useMantineColorScheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { useHotkeys } from "@mantine/hooks";
import ChangeTheme from "@/components/changeTheme";


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
  defaultRadius:"lg"
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
      <ChangeTheme/>
      {children}
    </MantineProvider>
    </body>
    </html>
  );
}
