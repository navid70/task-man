"use client";

import { PropsWithChildren, useState } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useComputedColorScheme } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function MyClerkProvider({ children }: PropsWithChildren) {
  const computedColorScheme = useComputedColorScheme('dark');
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider
        afterSignOutUrl="/"
        appearance={{
          baseTheme: computedColorScheme === "dark" ? dark : undefined,
        }}
      >
        {children}
      </ClerkProvider>
    </QueryClientProvider>
  );
}
