import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider } from 'next-themes';
import '@/index.css';
import App from '@/App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <App />
      </ThemeProvider>
    </HeroUIProvider>
  </StrictMode>
);
