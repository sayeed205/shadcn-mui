'use client';

import { Icons } from '../icons';
import { ThemeToggle } from '../theme-toggle';
import { Button } from '../ui/button';

export default function Header() {
    return (
        <header className='flex justify-between items-center p-4 bg-background backdrop-blur-sm shadow-md'>
            <div className='flex items-center space-x-2'>
                <div className='flex items-center space-x-2'>
                    <Icons.shadcn className='fill-primary h-10 w-10' />
                    <Icons.x className='inline-flex justify-center items-center h-5' />
                    <Icons.mdui className='fill-primary h-10 w-10' />
                </div>
            </div>

            <div className='flex items-center space-x-4'>
                <ThemeToggle />
                <Button variant='outlined'>
                    {/* <Github className='mr-2 h-4 w-4' /> GitHub */}
                    <Icons.github />
                    Github
                </Button>
            </div>
        </header>
    );
}
