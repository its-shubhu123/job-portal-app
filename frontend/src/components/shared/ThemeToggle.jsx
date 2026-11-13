import React, { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '../ui/button'

const ThemeToggle = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // next-themes only knows the real theme after mount, so wait to avoid a wrong icon flashing
    useEffect(() => setMounted(true), []);

    const isDark = mounted && resolvedTheme === 'dark';

    return (
        <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {isDark ? <Sun className='h-5 w-5' /> : <Moon className='h-5 w-5' />}
        </Button>
    )
}

export default ThemeToggle
