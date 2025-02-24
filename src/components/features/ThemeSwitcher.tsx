import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@headlessui/react';
import { Icon } from '@/components';

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      aria-label="Theme Toggle"
      onClick={toggleTheme}
      className="transition-all duration-300 ease-in-out cursor-pointer"
    >
      <Icon
        title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        name={theme === 'light' ? 'Sun' : 'Moon'}
      />
    </Button>
  );
};
