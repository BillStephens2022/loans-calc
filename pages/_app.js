
import Head from "next/head";
import Layout from "@/components/Layout";
import "@/styles/globals.css";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
   
      <Layout>
        <Head>
          <title>Corporate Loans</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <meta
            name="description"
            content="Loan Accounting & Risk Calculator"
          />
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