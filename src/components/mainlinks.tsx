import React, { useState } from 'react';
import {
    IconGitPullRequest,
    IconAlertCircle,
    IconMessages,
    IconDatabase,
    IconCalendar,
    IconHome,
    IconTrain,
    IconDiamond,
} from '@tabler/icons-react';
import { ThemeIcon, UnstyledButton, Group, Text, Button, NavLink, Box } from '@mantine/core';

// interface MainLinkProps {
//     icon: React.ReactNode;
//     color: string;
//     label: string;
//     index: number;
//     description : string;
// }

function MainLinks() { //{ icon, color, label, index, description }: MainLinkProps
    const [active, setActive] = useState(0);

    const links = data.map((link) => (
        <NavLink
            //   sx={(theme) => ({
            //     display: 'block',
            //     width: '100%',
            //     padding: theme.spacing.xs,
            //     borderRadius: theme.radius.sm,
            //     color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

            //     '&:hover': {
            //       backgroundColor:
            //         theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            //     },
            //   })}
            key={link.label}
            active={link.index === active}
            component="a"
            href={"/"+link.nav}
            description={link.description}
            icon={
                /**/ 
                <ThemeIcon mt={2} color={link.index === active ? 'blue' : link.color} variant={link.index === active ? 'filled' : 'light'}> 
                    {link.icon}
                </ThemeIcon>
            }
            label={<Text size="sm">{link.label}</Text>}
            onClick={() => setActive(link.index)}
            styles={{root:{borderRadius:5}, description:{fontSize:11}}}
        >
            {/* <Group>
                <ThemeIcon color={color} variant="light">
                    {icon}
                </ThemeIcon>

                <Text size="sm">{label}</Text>
            </Group> */}
        </NavLink>
    ));
    return <Box >{links}</Box> //<div>{links}</div>;
}

const data = [
    { icon: <IconDiamond size="1rem" />, color: 'grape', label: 'dashboard', index: 0, description: 'wg510 is superior', nav:'' },
    { icon: <IconTrain size="1rem" />, color: 'red', label: 'SBB', index: 1, description: 'on schedule', nav:'sbb' },
    { icon: <IconHome size="1rem" />, color: 'yellow', label: 'home', index: 2, description: 'all off', nav:'home' },
    { icon: <IconCalendar size="1rem" />, color: 'teal', label: 'calendar', index: 3, description: 'no events', nav:'calendar' },
];

export default MainLinks
//() {
// const links = data.map((link) => <MainLink {...link} key={link.label} />);
//     return <div>{links}</div>;
// }