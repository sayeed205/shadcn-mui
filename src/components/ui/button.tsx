'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

interface Ripple {
    x: number;
    y: number;
}

const useRipple = () => {
    const [ripples, setRipples] = React.useState<Ripple[]>([]);

    const handleClick = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            setRipples(currentRipples => [...currentRipples, { x, y }]);

            setTimeout(() => {
                setRipples(currentRipples => currentRipples.slice(1));
            }, 300);
        },
        []
    );

    return { ripples, handleClick };
};

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium rounded-full  relative ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-primary transition-all duration-500 disabled:cursor-not-allowed overflow-hidden active:shadow-none hover:shadow-on-primary-fixed-variant',
    {
        variants: {
            variant: {
                filled: 'bg-primary text-primary-on-primary hover:shadow-md disabled:bg-on-primary-container',
                tonal: 'bg-secondary-container text-primary hover:shadow-md',
                elevated:
                    'active:shadow-on-primary-fixed-variant shadow-on-primary-fixed-variant bg-background shadow-md active:shadow-sm text-primary active:bg-primary-container',
                outlined:
                    'border bg-background hover:bg-surface-container hover:text-accent-foreground text-primary hover:opacity-90 active:bg-secondary-container',
                ghost: 'bg-background hover:bg-secondary-container text-primary hover:opacity-90 active:bg-primary-container',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 px-3',
                lg: 'h-11 px-8',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'filled',
            size: 'default',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    isLoading?: boolean;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            asChild = false,
            startContent,
            endContent,
            isLoading,
            ...props
        },
        ref
    ) => {
        const { ripples, handleClick } = useRipple();
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                onClick={e => {
                    handleClick(e);
                    if (props.onClick) props.onClick(e);
                }}
                {...props}
            >
                {!!startContent && !isLoading ? startContent : null}
                {props.children}
                {endContent}
                {ripples.map((ripple, index) => (
                    <span
                        key={index}
                        className='absolute bg-white bg-opacity-30 rounded-full transform scale-0 animate-ripple w-10 h-10'
                        style={{
                            top: ripple.y - 20 + 'px', // Center the ripple
                            left: ripple.x - 20 + 'px',
                        }}
                    ></span>
                ))}
            </Comp>
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
