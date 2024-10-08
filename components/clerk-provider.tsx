"use client";

import { PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useComputedColorScheme } from "@mantine/core";

export function MyClerkProvider({ children }: PropsWithChildren) {
  const computedColorScheme = useComputedColorScheme('dark');

  return (
    <ClerkProvider
      afterSignOutUrl="/"
      appearance={{
        baseTheme: computedColorScheme === "dark" ? dark : undefined,
      }}
    >
      {children}
    </ClerkProvider>
  );
}
