import { ColorScheme } from '@mantine/core';

export function Logo({ colorScheme }: { colorScheme: ColorScheme }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" overflow="hidden" height={30}>
            <g transform="translate(0,14) scale(0.8)">
                <text
                    fill={colorScheme === 'dark' ? '#f0f0f0' : '#000'}
                    fontFamily="Impact,Impact_MSFontService,sans-serif"
                    fontWeight="700"
                    fontStretch="condensed" fontSize="20">WG</text>
                <text
                    fill={colorScheme === 'dark' ? '#f04d84' : "#970335"}
                    fontFamily="Calibri,Calibri_MSFontService,sans-serif"
                    fontWeight="700"
                    transform="translate(0,14)"
                    fontSize="18">510</text>
                <text
                    fill={colorScheme === 'dark' ? '#f0f0f0' : '#000'}
                    fontFamily="Impact,Impact_MSFontService,sans-serif"
                    fontWeight="900"
                    transform="translate(50,11)"
                    fontSize="32">WG 510</text>
            </g>
        </svg>
    );
}