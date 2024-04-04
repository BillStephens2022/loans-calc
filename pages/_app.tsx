import React from "react";
import Head from "next/head";
import Layout from "../components/layout/layout";
import "../styles/globals.css";

interface AppProps {
  Component: React.ComponentType<any>;
  pageProps: {
    [key: string]: any;
  };
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Head>
        <title>Corporate Loans</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="description" content="Loan Accounting & Risk Calculator" />
        <meta
          name="keywords"
          content="loans, loan accounting, loan calculator, loan balance sheet, loan journal entries, loan fronting exposure"
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
