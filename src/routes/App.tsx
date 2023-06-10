import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Grid,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  useMantineColorScheme,
  MantineProvider, ColorSchemeProvider, ColorScheme,
  Group,
  ActionIcon,
} from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { useColorScheme } from '@mantine/hooks';



import SBB from '../components/sbb'
import { Logo } from '../components/logo'
import { MainLinks } from '../components/mainlinks'
import { User } from '../components/user'

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import '../styles/App.css'

function App() {
  // const [count, setCount] = useState(0)

  // return (
  //   <>
  //     {/* <div>
  //       <a href="https://vitejs.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p> */}
  //     <MantineProvider withGlobalStyles withNormalizeCSS>
  //       <Text>Welcome to Mantine!</Text>
  //     </MantineProvider>
  //   </>
  // )

  const colorScheme_ = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(colorScheme_);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme_ === 'dark' ? 'light' : 'dark'));
  
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <ColorSchemeProvider colorScheme={colorScheme_} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme:colorScheme_ }} withGlobalStyles withNormalizeCSS>
        <AppShell
          styles={{
            root: {
              backgroundColor: colorScheme_ === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
              color: colorScheme_ === 'dark' ? theme.colors.gray[1] : theme.colors.dark[8],
            },
          }}
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          navbar={
            <Navbar p="xs" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
              {/* <Navbar height={600} p="xs" width={{ base: 300 }}> */}
      
      <Navbar.Section grow mt={0}>
        <MainLinks />
      </Navbar.Section>
      <Navbar.Section>
        <User />
      </Navbar.Section>
            </Navbar>
          }
          // aside={
          //   <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
          //       <Text>Application sidebar</Text>
          //     </Aside>
          //   </MediaQuery>
          // }
          // footer={
          //   <Footer height={60} p="md">
          //     Application footer
          //   </Footer>
          // }
          header={
            <Header height={{ base: 50, md: 70 }} p="md">
              <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    //color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>

                <Group sx={{ height: '100%' }} px={0} position="apart">
                  <Logo colorScheme={colorScheme_} />
                  {/* <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                    {colorScheme_ === 'dark' ? <IconSun size="1rem" /> : <IconMoonStars size="1rem" />}
                  </ActionIcon> */}
                </Group>
              </div>
            </Header>
          }
        >
          <Grid>
            <Grid.Col md={6} lg="auto">span=auto</Grid.Col>
            <Grid.Col md={6} lg={3}><SBB /></Grid.Col>
          </Grid>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App
