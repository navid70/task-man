import React from "react";
import "./globals.css";
import { ColorSchemeScript, createTheme, MantineProvider, useMantineColorScheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { useColorScheme, useHotkeys } from "@mantine/hooks";
import ChangeTheme from "@/components/changeTheme";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";


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

  const colorScheme = typeof window === 'undefined' ? undefined : window.localStorage.getItem("mantine-color-scheme-value");


  return (
    <html lang="en">
    <head>
      <ColorSchemeScript/>
    </head>
    <body>
    <MantineProvider theme={theme} defaultColorScheme={'dark'}>
      <ChangeTheme/>
      <ClerkProvider
        appearance={{
          baseTheme: colorScheme ? (colorScheme === "dark" ? dark : undefined) : dark
        }}
      >
        {children}
      </ClerkProvider>
    </MantineProvider>
    </body>
    </html>
  );
}
