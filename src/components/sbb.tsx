import { useState } from 'react';
import { ActionIcon, Badge, MantineProvider, ColorSchemeProvider, ColorScheme, AppShell, Navbar, Header } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { useColorScheme } from '@mantine/hooks';

function SBB() {


  const colorScheme = useColorScheme();

  return (
    <>
      <Badge color={colorScheme === 'dark' ? 'blue' : 'teal'} variant="filled">
        Your system color scheme is {colorScheme}
      </Badge>
    </>
  );
}

export default SBB