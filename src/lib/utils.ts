import { clsx, type ClassValue } from 'clsx';
import materialDynamicColors from 'material-dynamic-colors';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function hexToCssHsl(hex: string, valuesOnly = false) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result || result.length !== 4) throw 'Failed to parse hex';

    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);
    let cssString = '';
    (r /= 255), (g /= 255), (b /= 255);
    const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h = 0,
        s = 0,
        l = (max + min) / 2;
    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    cssString = h + ',' + s + '%,' + l + '%';
    cssString = !valuesOnly ? 'hsl(' + cssString + ')' : cssString;

    return cssString;
}

export const kebabize = (str: string) =>
    str.replace(
        /[A-Z]+(?![a-z])|[A-Z]/g,
        ($, ofs) => (ofs ? '-' : '') + $.toLowerCase()
    );

export async function generateThemeCSS(source: string | File) {
    const colorsObject = await materialDynamicColors(source);
    let css = '';
    for (const modeName in colorsObject) {
        // @ts-ignore
        const modeValue = colorsObject[modeName];

        if (modeName === 'light') css += ':root {\n';
        else css += `.${modeName} {\n`;
        for (const colorName in modeValue) {
            const colorValue = modeValue[colorName];
            const hsl = hexToCssHsl(colorValue, true);
            css += `--${kebabize(colorName)}: ${hsl};\n`;
        }
        css += '}\n';
    }
    return css;
}

export function mapMaterialToShadcn(materialVars: Record<string, string>) {
    return {
        '--background': materialVars['--background'],
        '--foreground': materialVars['--on-background'],
        '--card': materialVars['--surface'],
        '--card-foreground': materialVars['--on-surface'],
        '--popover': materialVars['--surface'],
        '--popover-foreground': materialVars['--on-surface'],
        '--primary': materialVars['--primary'],
        '--primary-foreground': materialVars['--on-primary'],
        '--secondary': materialVars['--secondary'],
        '--secondary-foreground': materialVars['--on-secondary'],
        '--muted': materialVars['--surface-variant'],
        '--muted-foreground': materialVars['--on-surface-variant'],
        '--accent': materialVars['--tertiary'],
        '--accent-foreground': materialVars['--on-tertiary'],
        '--destructive': materialVars['--error'],
        '--destructive-foreground': materialVars['--on-error'],
        '--border': materialVars['--outline'],
        '--input': materialVars['--surface-variant'],
        '--ring': materialVars['--primary'],
    };
}
