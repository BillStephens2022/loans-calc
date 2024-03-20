import Head from "next/head";
import Link from "next/link";
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
            <li>C</li>
            <li>O</li>
            <li>R</li>
            <li>P</li>
            <li>O</li>
            <li>R</li>
            <li>A</li>
            <li>T</li>
            <li>E</li>
            <li>&nbsp;</li>
            <li>L</li>
            <li>O</li>
            <li>A</li>
            <li>N</li>
            <li>S</li>
          </ul>
        </div>
        <h2 className={classes.home_subheader}>Accounting & Risk Examples</h2>
        <div className={classes.featuresContainer}>
          
            <Link href="/Accounting" className={classes.featureBox}>
              <h3>Accounting Examples</h3>
              <p>Enter example loan terms to view simulated journal entries</p>
            </Link>
        

        
            <Link href="/Fronting" className={classes.featureBox}>
              <h3>Fronting Exposure</h3>
              <h4>Swingline Loan & Issued LC Fronting</h4>
              <p>
                Enter example loan terms to view Fronting Exposure Calculations
              </p>
            </Link>
          
        </div>
      </main>
    </>
  );
};

export default Home;
