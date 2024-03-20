import Head from "next/head";
import classes from "@/pages/Home.module.css";

const Home = () => {
  return (
    <>
      <Head>
        <title>Corporate Loans</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={classes.home_main}>
        <h1 className={classes.home_header}>Corporate Loans</h1>
        <h2 className={classes.home_header}>Accounting & Risk Examples</h2>
      </main>
    </>
  );
}

export default Home;