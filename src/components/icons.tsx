import { LucideProps } from 'lucide-react';

export type Icon = LucideProps;

export const Icons = {
    mdui: ({ ...props }: LucideProps) => (
        <svg
            viewBox='0 96 960 960'
            className='h-6 w-6'
            fill='currentColor'
            {...props}
        >
            <path d='M480 1016q-91 0-171-34.5T169 887q-60-60-94.5-140T40 576q0-91 34.5-171T169 265q60-60 140-94.5T480 136q91 0 171 34.5T791 265q60 60 94.5 140T920 576q0 91-34.5 171T791 887q-60 60-140 94.5T480 1016ZM200 802V351q-38 47-59 104t-21 121q0 65 21 122t59 104Zm54-506h452q-47-38-104-59t-122-21q-65 0-122 21t-104 59Zm226 381 151-301H330l150 301Zm40 99h160V456L520 776Zm-240 0h160L280 456v320Zm200 160q64 0 121.5-21T706 856H254q47 38 104.5 59T480 936Zm280-134q38-47 59-104t21-122q0-64-21-121t-59-104v451Z' />
        </svg>
    ),
    shadcn: ({ ...props }: LucideProps) => (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 256 256'
            className='h-6 w-6'
            {...props}
        >
            <rect width='256' height='256' fill='none'></rect>
            <line
                x1='208'
                y1='128'
                x2='128'
                y2='208'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
            ></line>
            <line
                x1='192'
                y1='40'
                x2='40'
                y2='192'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
            ></line>
        </svg>
    ),
};
