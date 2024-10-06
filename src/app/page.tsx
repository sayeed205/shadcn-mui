import Header from '@/components/blocks/header';
import { Icons } from '@/components/icons';
import { ThemeGenerator } from '@/components/theme-generator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
    // const colorsObject = await materialDynamicColors('#c181d7');
    // let css = '';
    // for (const modeName in colorsObject) {
    //     // @ts-ignore
    //     const modeValue = colorsObject[modeName];

    //     if (modeName === 'light') css += ':root {\n';
    //     else css += `.${modeName} {\n`;
    //     for (const colorName in modeValue) {
    //         const colorValue = modeValue[colorName];
    //         const hsl = hexToCssHsl(colorValue, true);
    //         css += `--${kebabize(colorName)}: ${hsl};\n`;
    //     }
    //     css += '}\n';
    // }
    // console.log(css);

    return (
        <div className='min-h-screen font-[family-name:var(--font-geist-sans)]'>
            <Header />
            <main className='container mx-auto px-4 py-8'>
                <section className='text-center mt-24'>
                    <div className='flex items-center space-x-2 justify-center mb-10'>
                        <Link target='_blank' href='https://ui.shadcn.com'>
                            <Icons.shadcn className='fill-primary h-20 w-20' />
                        </Link>
                        <Icons.x className='inline-flex justify-center items-center h-10 w-10' />
                        <Link target='_blank' href='https://material-web.dev'>
                            <Icons.mdui className='h-20 w-20' />
                        </Link>
                    </div>
                    <h1 className='text-4xl font-bold mb-4'>
                        Material You for shadcn/ui
                    </h1>
                    <p className='text-xl mb-8'>
                        Elevate your React applications with Material You design
                        principles, powered by shadcn/ui
                    </p>
                    <div className='flex justify-center space-x-4'>
                        <Button size='lg'>Get Started</Button>
                        <Button variant='outlined' size='lg'>
                            View on GitHub
                        </Button>
                    </div>
                </section>
                <ThemeGenerator />
            </main>
            <footer className='bg-background p-8 text-center '>
                <p>
                    &copy; {new Date().getFullYear()} Material You for
                    shadcn/ui. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
