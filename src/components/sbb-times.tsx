import { useEffect, useState } from 'react';
import {
  ActionIcon,
  Badge,
  Button,
  Image,
  Text,
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  AppShell,
  Navbar,
  Header,
  Card,
  Group,
  useMantineTheme,
  Stack,
  ScrollArea
} from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { useColorScheme } from '@mantine/hooks';
import { resourceLimits } from 'worker_threads';

function badge_text(time_delay: number, time_in: number): { txt: string, c: string } {
  if (time_delay < 1 && time_in > 3)
    return { txt: 'ok', c: 'green' }
  else if (time_delay < 1)
    return { txt: 'run', c: 'yellow.8' }
  else
    return { txt: '+' + time_delay, c: 'red' }
}

function api<T>(url: string): Promise<T> {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json().then(data => data as T);
    })
}

// function fetch_data(): [{ color: string; bus: number; dir: string; time_dep: string; time_in: number; time_delay: number; }] {
//   //let result: [{ color: string; bus: number; dir: string; time_dep: string; time_in: number; time_delay: number; }];

//   const newItems: [{ color: string; bus: number; dir: string; time_dep: string; time_in: number; time_delay: number; }] =
//    [{ color: 'red', bus: 0, dir: 'fail2', time_dep: '--:--', time_in: 0, time_delay: 0 }]
//   const now_ = new Date();
//   const url = 'https://fpbe.zvv.ch/restproxy/departureBoard?format=json&accessId=OFPubique&type=DEP_STATION&duration=1439&id=A%3D1%40O%3DZ%C3%BCrich,+Holzerhurd%40X%3D8496613%40Y%3D47423797%40U%3D87%40L%3D8591200%40B%3D1%40p%3D1683641194%40&date=' + now_.getFullYear() + '-' + (((now_.getMonth() + 1) < 10 ? '0' : '') + (now_.getMonth() + 1)) + '-' + ((now_.getDate() < 10 ? '0' : '') + now_.getDate()) + '&time=' + ((now_.getHours() < 10 ? '0' : '') + now_.getHours()) + ':' + ((now_.getMinutes() < 10 ? '0' : '') + now_.getMinutes()) + '&passlist=1&maxJourneys=5';

//   // Make the GET request
// console.log('call')
//   api<{ Departure: any }>(url)
//     .then(({ Departure }) => {
//       //console.log(Departure)
//       Departure.forEach((dep: { rtTime: any; time: any; direction: any; }) => {
//         const rttime_ = dep.rtTime ? dep.rtTime : dep.time;
//         const dest_ = dep.direction;
//         const time_ = dep.time;
//         const currentTime = new Date();
//         const [hours, minutes, seconds] = time_.split(':');
//         const specifiedTime = new Date();
//         specifiedTime.setHours(hours);
//         specifiedTime.setMinutes(minutes);
//         specifiedTime.setSeconds(seconds);

//         const [rthours, rtminutes, rtseconds] = rttime_.split(':');
//         const rtstime = new Date();
//         rtstime.setHours(rthours);
//         rtstime.setMinutes(rtminutes);
//         rtstime.setSeconds(rtseconds);
//         const rtdiff = Math.floor((rtstime.getTime() - specifiedTime.getTime()) / (1000 * 60)) % 1440;

//         const timeDiff = Math.floor((rtstime.getTime() - currentTime.getTime()) / (1000 * 60)) % 1440;

//         //console.log(timeDiff, rtdiff);

//         const item = { color: 'pink.1', bus: 32, dir: dest_, time_dep: hours + ':' + minutes, time_in: timeDiff, time_delay: rtdiff }

//         //console.log(item)
//         newItems.push(item);
//       })

//       if(newItems.length>1)
//         newItems.splice(0,1);

//       console.log(newItems)
//       return newItems
//     })
//     .catch(error => {
//       /* show error message */
//       console.log(error)
//       //result.push({ color: 'red', bus: 32, dir: 'error', time_dep: '14:28', time_in: 3, time_delay: 4 })
//     })

//   return newItems
// }

function fetch_data(dep: { rtTime: any; time: any; direction: any; name: any; } ): { color: {b:string, f:string}; bus: number; dir: string; time_dep: string; time_in: number; time_delay: number; } {
  const rttime_ = dep.rtTime ? dep.rtTime : dep.time;
  const dest_ = dep.direction;
  const time_ = dep.time;
  const bus_ = dep.name.includes('32') 
  const currentTime = new Date();
  const [hours, minutes, seconds] = time_.split(':');
  const specifiedTime = new Date();
  specifiedTime.setHours(hours);
  specifiedTime.setMinutes(minutes);
  specifiedTime.setSeconds(seconds);

  const [rthours, rtminutes, rtseconds] = rttime_.split(':');
  const rtstime = new Date();
  rtstime.setHours(rthours);
  rtstime.setMinutes(rtminutes);
  rtstime.setSeconds(rtseconds);
  const rtdiff = Math.floor((rtstime.getTime() - specifiedTime.getTime()) / (1000 * 60)) % 1440;

  const timeDiff = Math.floor((rtstime.getTime() - currentTime.getTime()) / (1000 * 60)) % 1440;

  //console.log(timeDiff, rtdiff);

  return { color: bus_ ? {b:'pink.1',f:'dark.8'} : {b:'blue.9', f:'indigo.0'}, bus: bus_ ? 32 : 61, dir: dest_, time_dep: hours + ':' + minutes, time_in: timeDiff, time_delay: rtdiff }
}

function SBB() {
  //color mngmt
  const colorScheme = useColorScheme();
  const theme = useMantineTheme();

  //data collection
  const [data, setData] = useState([{ color: {b:'red',f:'dark.9'}, bus: 0, dir: 'fail1', time_dep: '--:--', time_in: 0, time_delay: 0 }]);
  const [data2, setData2] = useState([{ color: {b:'red',f:'dark.9'}, bus: 0, dir: 'fail1', time_dep: '--:--', time_in: 0, time_delay: 0 }]);

  //runs only on first render
  useEffect(() => {    
      const newItems: [{ color: {b:string, f:string}; bus: number; dir: string; time_dep: string; time_in: number; time_delay: number; }] =
        [{ color: {b:'red',f:'dark.9'}, bus: 0, dir: 'fail2', time_dep: '--:--', time_in: 0, time_delay: 0 }]
      const newItems2: [{ color: {b:string, f:string}; bus: number; dir: string; time_dep: string; time_in: number; time_delay: number; }] =
        [{ color: {b:'red',f:'dark.9'}, bus: 0, dir: 'fail2', time_dep: '--:--', time_in: 0, time_delay: 0 }]
      const now_ = new Date();
      const url = 'https://fpbe.zvv.ch/restproxy/departureBoard?format=json&accessId=OFPubique&type=DEP_STATION&duration=1439&id=A%3D1%40O%3DZ%C3%BCrich,+Holzerhurd%40X%3D8496613%40Y%3D47423797%40U%3D87%40L%3D8591200%40B%3D1%40p%3D1683641194%40&date=' + now_.getFullYear() + '-' + (((now_.getMonth() + 1) < 10 ? '0' : '') + (now_.getMonth() + 1)) + '-' + ((now_.getDate() < 10 ? '0' : '') + now_.getDate()) + '&time=' + ((now_.getHours() < 10 ? '0' : '') + now_.getHours()) + ':' + ((now_.getMinutes() < 10 ? '0' : '') + now_.getMinutes()) + '&passlist=1&maxJourneys=5';
      const url2 = 'https://fpbe.zvv.ch/restproxy/departureBoard?format=json&accessId=OFPubique&type=DEP_STATION&duration=1439&id=A=1@O=Zürich,+Mühlacker@X=8496352@Y=47426180@U=87@L=8591281@B=1@p=1683641194@&date=' + now_.getFullYear() + '-' + (((now_.getMonth() + 1) < 10 ? '0' : '') + (now_.getMonth() + 1)) + '-' + ((now_.getDate() < 10 ? '0' : '') + now_.getDate()) + '&time=' + ((now_.getHours() < 10 ? '0' : '') + now_.getHours()) + ':' + ((now_.getMinutes() < 10 ? '0' : '') + now_.getMinutes()) + '&passlist=1&maxJourneys=3';

      api<{ Departure: any }>(url)
        .then(({ Departure }) => {
          Departure.forEach((dep: { rtTime: any; time: any; direction: any; name: any; }) => {
            const item = fetch_data(dep)
            newItems.push(item);
          })
          console.log('call inside SBB 32')

          if (newItems[0].dir.startsWith('fail'))
            newItems.splice(0, 1);

          if (newItems.length > 1) {
            console.log(newItems)
            setData(newItems)
          }

        })

      api<{ Departure: any }>(url2)
        .then(({ Departure }) => {
          Departure.forEach((dep: { rtTime: any; time: any; direction: any; name: any;}) => {
            const item = fetch_data(dep)
            newItems2.push(item);
          })
          console.log('call inside SBB 61')

          if (newItems2[0].dir.startsWith('fail'))
            newItems2.splice(0, 1);

          if (newItems2.length > 1) {
            console.log(newItems2)
            setData2(newItems2)
          }

        })
  }, []);

  //runs periodically every 50seconds (not on first render)
  useEffect(() => {
    const interval = setInterval(() => {
      const newItems: [{ color: {b:string, f:string}; bus: number; dir: string; time_dep: string; time_in: number; time_delay: number; }] =
        [{ color: {b:'red',f:'dark.9'}, bus: 0, dir: 'fail2', time_dep: '--:--', time_in: 0, time_delay: 0 }]
      const newItems2: [{ color: {b:string, f:string}; bus: number; dir: string; time_dep: string; time_in: number; time_delay: number; }] =
        [{ color: {b:'red',f:'dark.9'}, bus: 0, dir: 'fail2', time_dep: '--:--', time_in: 0, time_delay: 0 }]
      const now_ = new Date();
      const url = 'https://fpbe.zvv.ch/restproxy/departureBoard?format=json&accessId=OFPubique&type=DEP_STATION&duration=1439&id=A%3D1%40O%3DZ%C3%BCrich,+Holzerhurd%40X%3D8496613%40Y%3D47423797%40U%3D87%40L%3D8591200%40B%3D1%40p%3D1683641194%40&date=' + now_.getFullYear() + '-' + (((now_.getMonth() + 1) < 10 ? '0' : '') + (now_.getMonth() + 1)) + '-' + ((now_.getDate() < 10 ? '0' : '') + now_.getDate()) + '&time=' + ((now_.getHours() < 10 ? '0' : '') + now_.getHours()) + ':' + ((now_.getMinutes() < 10 ? '0' : '') + now_.getMinutes()) + '&passlist=1&maxJourneys=5';
      const url2 = 'https://fpbe.zvv.ch/restproxy/departureBoard?format=json&accessId=OFPubique&type=DEP_STATION&duration=1439&id=A=1@O=Zürich,+Mühlacker@X=8496352@Y=47426180@U=87@L=8591281@B=1@p=1683641194@&date=' + now_.getFullYear() + '-' + (((now_.getMonth() + 1) < 10 ? '0' : '') + (now_.getMonth() + 1)) + '-' + ((now_.getDate() < 10 ? '0' : '') + now_.getDate()) + '&time=' + ((now_.getHours() < 10 ? '0' : '') + now_.getHours()) + ':' + ((now_.getMinutes() < 10 ? '0' : '') + now_.getMinutes()) + '&passlist=1&maxJourneys=3';

      api<{ Departure: any }>(url)
        .then(({ Departure }) => {
          Departure.forEach((dep: { rtTime: any; time: any; direction: any; name: any; }) => {
            const item = fetch_data(dep)
            newItems.push(item);
          })
          console.log('call inside SBB 32')

          if (newItems[0].dir.startsWith('fail'))
            newItems.splice(0, 1);

          if (newItems.length > 1) {
            console.log(newItems)
            setData(newItems)
          }

        })

      api<{ Departure: any }>(url2)
        .then(({ Departure }) => {
          Departure.forEach((dep: { rtTime: any; time: any; direction: any; name: any;}) => {
            const item = fetch_data(dep)
            newItems2.push(item);
          })
          console.log('call inside SBB 61')

          if (newItems2[0].dir.startsWith('fail'))
            newItems2.splice(0, 1);

          if (newItems2.length > 1) {
            console.log(newItems2)
            setData2(newItems2)
          }

        })


    }, 50000);
    return () => clearInterval(interval); //unmount to prevent memory leaks.
  }, [])

  // { color: 'pink.1', bus: 32, dir: 'Holzerhurd', time_dep: '14:28', time_in: 3, time_delay: 4 },
  // { color: 'pink.1', bus: 32, dir: 'Holzerhurd', time_dep: '14:29', time_in: 4, time_delay: 0 },
  // { color: 'pink.1', bus: 32, dir: 'Holzerhurd', time_dep: '14:24', time_in: 48, time_delay: 2 },
  // { color: 'pink.1', bus: 32, dir: 'Holzerhurd', time_dep: '14:21', time_in: 458, time_delay: 2 },
  // { color: 'blue.9', bus: 61, dir: 'Mühlacker', time_dep: '14:25', time_in: 4, time_delay: 0 },
  // { color: 'blue.9', bus: 61, dir: 'Mühlacker', time_dep: '14:20', time_in: 12, time_delay: 0 },
  //{ color: 'blue.9', bus: 61, dir: 'Mühlacker', time_dep: '14:00', time_in: 468, time_delay: 2 },]


  const cards = data.map((card) => (
    <Card shadow="sm" mt='sm' mb='sm' ml='xs' mr='xs' pl="md" pr="md" pt={10} pb={10} radius="md" withBorder key={card.bus + card.time_dep}>
      <Group position="apart">
        <Group>
          <Badge color={card.color.b} p='md' variant="filled">
            <Text fz='lg' color={card.bus === 32 ? 'dark.8' : 'indigo.0'}>{card.bus}</Text>
          </Badge>
          <Text >{card.dir}</Text>
        </Group>
        <Stack spacing={0} align='flex-end'>
          <Group mb={-10} spacing={5}>
            <Text fw={500} fz={25} color={colorScheme === 'dark' ? 'gray.0' : 'dark.8'}>{card.time_in}'</Text>
            <Badge mt={-15} pl={5} pr={5} color={badge_text(card.time_delay, card.time_in).c} variant="light">
              {badge_text(card.time_delay, card.time_in).txt}
            </Badge>
          </Group>
          <Text fz='md' color='dimmed'>{card.time_dep}</Text>
        </Stack>
      </Group>
    </Card>
  ));

  //61
  const cards2 = data2.map((card) => (
    <Card shadow="sm" mt='sm' mb='sm' ml='xs' mr='xs' pl="md" pr="md" pt={10} pb={10} radius="md" withBorder key={card.bus + card.time_dep}>
      <Group position="apart">
        <Group>
        <Badge color={card.color.b} p='md' variant="filled">
            <Text fz='lg' color={card.color.f}>{card.bus}</Text>
          </Badge>
          <Text >{card.dir}</Text>
        </Group>
        <Stack spacing={0} align='flex-end'>
          <Group mb={-10} spacing={5}>
            <Text fw={500} fz={25} color={colorScheme === 'dark' ? 'gray.0' : 'dark.8'}>{card.time_in}'</Text>
            <Badge mt={-15} pl={5} pr={5} color={badge_text(card.time_delay, card.time_in).c} variant="light">
              {badge_text(card.time_delay, card.time_in).txt}
            </Badge>
          </Group>
          <Text fz='md' color='dimmed'>{card.time_dep}</Text>
        </Stack>
      </Group>
    </Card>
  ));

  return <ScrollArea.Autosize type="hover" offsetScrollbars >{cards} {cards2}</ScrollArea.Autosize>
}

export default SBB

