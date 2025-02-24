import { HelmetProvider, Helmet } from 'react-helmet-async';
import { cn } from '@/utils';
import type { LayoutProps } from '@/types';

export const Layout = ({ className = '', children }: LayoutProps) => {
  const title = import.meta.env.VITE_APP_TITLE;
  const description = import.meta.env.VITE_APP_DESCRIPTION;
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  const ogImage = import.meta.env.VITE_APP_OG_IMAGE || '';

  const { pathname } = window.location;
  const url = `${baseUrl}${pathname}`;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:description" content={description} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {ogImage && <meta name="twitter:image" content={ogImage} />}
      </Helmet>
      <main className={cn('p-2 md:p-4', className)}>{children}</main>
    </HelmetProvider>
  );
};
