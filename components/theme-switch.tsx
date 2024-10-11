"use client"

import { Switch, useMantineTheme, rem, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

export function ThemeSwitch() {
  const { toggleColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  const computedColorScheme = useComputedColorScheme('light');


  const theme = useMantineTheme();

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[9]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[5]}
    />
  );

  return <Switch size="md" color="dark.4" offLabel={sunIcon} onLabel={moonIcon} checked={computedColorScheme==="dark"}
                 onChange={toggleColorScheme}
  />;
}
