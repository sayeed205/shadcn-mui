'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { useEffect, useState } from 'react';

import { mapMaterialToShadcn } from '@/lib/utils';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('dynamicTheme');
        if (savedTheme) {
            applyTheme(savedTheme);
        }
    }, []);

    const applyTheme = (css: string) => {
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

            const mappedLightVars = mapMaterialToShadcn(lightVars);
            const mappedDarkVars = mapMaterialToShadcn(darkVars);

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
    };

    if (!mounted) {
        return null;
    }

    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
