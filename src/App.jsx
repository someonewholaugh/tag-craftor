import { Helmet, HelmetProvider } from 'react-helmet-async';
import Home from '@/pages/Home';

const App = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{import.meta.env.VITE_APP_NAME}</title>
        <meta name="description" content={import.meta.env.VITE_APP_DESCRIPTION} />
        <meta property="og:title" content={import.meta.env.VITE_OG_TITLE} />
        <meta property="og:type" content={import.meta.env.VITE_OG_TYPE} />
        <meta property="og:description" content={import.meta.env.VITE_APP_DESCRIPTION} />
      </Helmet>
      <Home />
    </HelmetProvider>
  );
};

export default App;
