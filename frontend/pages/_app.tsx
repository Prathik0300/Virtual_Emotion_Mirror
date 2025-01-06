import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Rubik } from "next/font/google";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { CacheProvider } from "@emotion/react";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";

const rubik = Rubik({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: rubik.style.fontFamily,
  },
});

const emotionCache = createCache({ key: "custom-css" });

export default function App({ Component, pageProps }: AppProps) {
  const [queryclient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryclient}>
      <Hydrate state={pageProps.dehydratedState}>
        <CacheProvider value={emotionCache}>
          <AppCacheProvider {...pageProps}>
            <ThemeProvider theme={theme}>
              <main className={rubik.className}>
                <Component {...pageProps} />
              </main>
            </ThemeProvider>
          </AppCacheProvider>
        </CacheProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}


