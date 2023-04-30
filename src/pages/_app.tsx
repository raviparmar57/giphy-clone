import Header from "@/components/Layout/Header";
import Main from "@/components/Layout/Main";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Main>
        <Component {...pageProps} />
      </Main>
    </>
  );
}
