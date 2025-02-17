import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from "@heroui/button";
import Icon from '@/components/common/Icon';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <Button
        isIconOnly
        aria-label="Theme Switcher"
        variant="light"
        radius="sm"
        onClick={toggleTheme}
      >
        <Icon name={theme === 'light' ? 'Sun' : 'Moon'} />
      </Button>
    </>
  );
};

export default ThemeSwitcher;
