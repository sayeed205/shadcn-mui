'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateThemeCSS, mapMaterialToShadcn } from '@/lib/utils';

export function ThemeGenerator() {
    const [hexColor, setHexColor] = useState('#c181d7');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const { setTheme, theme } = useTheme();

    useEffect(() => {
        const savedHexColor = localStorage.getItem('savedHexColor');
        if (savedHexColor) {
            setHexColor(savedHexColor);
        }
    }, []);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = e.target.value;
        setHexColor(newColor);
        localStorage.setItem('savedHexColor', newColor);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const generateTheme = async () => {
        let themeColor = imageFile || hexColor;

        const css = await generateThemeCSS(themeColor);
        localStorage.setItem('dynamicTheme', css);

        // Parse the CSS to extract variables
        const parser = new DOMParser();
        const doc = parser.parseFromString(
            `<style>${css}</style>`,
            'text/html'
        );
        const styleElement = doc.querySelector('style');
        if (styleElement) {
            const cssText = styleElement.textContent || '';
            const lightVars: Record<string, string> = {};
            const darkVars: Record<string, string> = {};

            cssText.split('}').forEach(block => {
                const [selector, rules] = block.split('{');
                if (selector && rules) {
                    const vars =
                        selector.trim() === ':root' ? lightVars : darkVars;
                    rules.split(';').forEach(rule => {
                        const [key, value] = rule.split(':');
                        if (key && value) {
                            vars[key.trim()] = value.trim();
                        }
                    });
                }
            });

            // Map Material variables to shadcn/ui variables
            const mappedLightVars = mapMaterialToShadcn(lightVars);
            const mappedDarkVars = mapMaterialToShadcn(darkVars);

            // Create and apply the new style element
            const newStyle = document.createElement('style');
            newStyle.textContent = `
        :root {
          ${Object.entries(mappedLightVars)
              .map(([key, value]) => `${key}: ${value};`)
              .join('\n')}
        }
        .dark {
          ${Object.entries(mappedDarkVars)
              .map(([key, value]) => `${key}: ${value};`)
              .join('\n')}
        }
      `;
            document.head.appendChild(newStyle);
        }

        // Force a re-render of shadcn/ui components
        setTheme('light');
        setTimeout(() => setTheme('dark'), 0);
        theme && setTheme(theme);
    };

    return (
        <div className='space-y-4'>
            <div>
                <label
                    htmlFor='hexColor'
                    className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                    Hex Color
                </label>
                <Input
                    type='color'
                    id='hexColor'
                    value={hexColor}
                    onChange={handleColorChange}
                    className='mt-1'
                />
            </div>
            <div>
                <label
                    htmlFor='imageFile'
                    className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                    Or upload an image
                </label>
                <Input
                    type='file'
                    id='imageFile'
                    accept='image/*'
                    onChange={handleImageChange}
                    className='mt-1'
                />
            </div>
            <Button onClick={generateTheme}>Generate Theme</Button>
        </div>
    );
}
