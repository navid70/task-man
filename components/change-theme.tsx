"use client"

import { useMantineColorScheme } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";

function ChangeTheme() {

  const { toggleColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  useHotkeys([
    ['ctrl+shift+X', () => {
      toggleColorScheme();
    }],
  ]);

  return null;
}

export default ChangeTheme;
