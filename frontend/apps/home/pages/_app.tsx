import { SSRProvider } from '@react-aria/ssr';
import { Provider } from '@react-spectrum/provider';
import { theme } from '@react-spectrum/theme-default';
// import { AuthProvider } from '@watheia/waweb.auth';
// import { MessageProvider } from '@watheia/waweb.message';
import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

// Import any global styles here...
import '@compendium/frontend.theme.styles';

function WaNextApp({ Component, pageProps }: AppProps) {
  // keep color scheme in sync with tailwindcss
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('dark');
  useEffect(() => {
    window.document.body.classList?.remove('loading');
    setColorScheme(
      window.document.body.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
    );
  }, []);
  return (
    <SSRProvider>
      <Provider theme={theme} colorScheme={colorScheme} minHeight="100%">
        <Component {...pageProps} />
      </Provider>
    </SSRProvider>
  );
}

export default WaNextApp;
