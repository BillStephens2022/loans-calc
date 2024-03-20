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
        <div className={classes.home_header_container}>
        <ul className={classes.home_header_ul}>
          <li>C</li><li>O</li><li>R</li><li>P</li><li>O</li><li>R</li><li>A</li><li>T</li><li>E</li>
          <li>&nbsp;</li><li>L</li><li>O</li><li>A</li><li>N</li><li>S</li>
        </ul>
        </div>
        <h2 className={classes.home_subheader}>Accounting & Risk Examples</h2>
      </main>
    </>
  );
}

export default Home;