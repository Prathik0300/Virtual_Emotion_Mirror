import type { AppProps } from "next/app";
import { Rubik } from "next/font/google";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AppContextProvider from "@/src/context";
import "@/styles/globals.css";
import "@/styles/colors.css";
import { ToastContainer } from "react-toastify";
import Layout from "@/src/modules/layout";

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
  palette: {
    primary: {
      main: "#fb8b24",
    },
    secondary: {
      main: "#fff8e6",
    },
    error: {
      main: "#f44336",
    },
    text: {
      primary: "#fb8b24",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root.Mui-error": {
            color: "#f44336",
          },
          "& .MuiOutlinedInput-root.Mui-error": {
            borderColor: "#f44336",
          },
          "& .MuiFormHelperText-root.Mui-error": {
            color: "#f44336",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

const clientEmotionCache = createCache({ key: "css", prepend: true });

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

export default function App({
  Component,
  pageProps,
  emotionCache = clientEmotionCache,
}: MyAppProps) {

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
      <CacheProvider value={emotionCache}>
        <AppCacheProvider {...pageProps}>
          <ThemeProvider theme={theme}>
            <AppContextProvider>
              <main className={rubik.className}>
                <GoogleOAuthProvider
                  clientId={
                    process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID || ""
                  }
                >
                  <Layout>
                    <>
                      <Component {...pageProps} />
                      <ToastContainer
                        position="bottom-right"
                        pauseOnFocusLoss={false}
                        autoClose={3000}
                        limit={3}
                      />
                    </>
                  </Layout>
                </GoogleOAuthProvider>
              </main>
            </AppContextProvider>
          </ThemeProvider>
        </AppCacheProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}
