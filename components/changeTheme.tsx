"use client"

import React from 'react';
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

  return (
    <div></div>
  );
}

export default ChangeTheme;
