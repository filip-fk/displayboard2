import { useEffect, useState } from 'react';
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
  Box,
  ScrollArea,
  Button,
  Stack,
} from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { useColorScheme, useFullscreen } from '@mantine/hooks';



import SBB from '../components/sbb-times'
import { Logo } from '../components/logo'
import MainLinks from '../components/mainlinks'
import { User } from '../components/user'

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import '../styles/App.css'
import Weather from '../components/weather';

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

  //color mngmt
  const colorScheme_ = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(colorScheme_);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme_ === 'dark' ? 'light' : 'dark'));

  const theme = useMantineTheme();

  //mobile
  const [opened, setOpened] = useState(false);

  //fullscren
  const { ref, toggle, fullscreen } = useFullscreen();

  //time
  const [now_, setNow_] = useState(new Date());
  const [show_dots, setShow_dots] = useState(true)
  useEffect(() => {
    const interval = setInterval(() => {
      setShow_dots((show_dots) => !show_dots)
      setNow_(new Date());
    }, 500);
    return () => clearInterval(interval); //unmount to prevent memory leaks.
  }, [])

  return (
    <ColorSchemeProvider colorScheme={colorScheme_} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme: colorScheme_ }} withGlobalStyles withNormalizeCSS>
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
            <Navbar p="xs" hiddenBreakpoint={3000} hidden={!opened}>
              {/* <Navbar height={600} p="xs" width={{ base: 300 }}> */}

              <Navbar.Section grow mt={0}>
                <MainLinks />
              </Navbar.Section>
              <Navbar.Section>
                <Button onClick={toggle} variant='subtle' color={fullscreen ? 'red' : 'blue'}>
                  {fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                </Button>
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
            <Header height={{ base: 50 }} p="sm">
              <Group position='apart'>
                <Group spacing={0}>
                  <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                    <Burger
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                      size="sm"
                      //color={theme.colors.gray[6]}
                      ml="xs"
                      mr="lg"
                    />
                  </MediaQuery>

                  <Group sx={{ height: '100%' }} px={0} position="apart">
                    <Logo colorScheme={colorScheme_} />
                    {/* <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                    {colorScheme_ === 'dark' ? <IconSun size="1rem" /> : <IconMoonStars size="1rem" />}
                  </ActionIcon> */}
                  </Group>
                </Group>
                <Group spacing={2}>
                  <Text fw={600}>{now_.getHours()}</Text>
                  <Text color={show_dots ? 'yellow.4' : 'yellow.0'}>:</Text>
                  <Text fw={600}>{now_.getMinutes()}</Text>
                </Group>
              </Group>
            </Header>
          }
        >
          <Grid >
            <Grid.Col lg={6} xl="auto">
              <Weather />
            </Grid.Col>
            <Grid.Col lg={6} xl={3}>
              <SBB />
            </Grid.Col>
          </Grid>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App
