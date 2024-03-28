import Head from "next/head";
import Link from "next/link";
import classes from "./home.module.css";

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
            <li className={classes.home_header_li}>C</li>
            <li className={classes.home_header_li}>O</li>
            <li className={classes.home_header_li}>R</li>
            <li className={classes.home_header_li}>P</li>
            <li className={classes.home_header_li}>O</li>
            <li className={classes.home_header_li}>R</li>
            <li className={classes.home_header_li}>A</li>
            <li className={classes.home_header_li}>T</li>
            <li className={classes.home_header_li}>E</li>
            <li className={classes.home_header_li}>&nbsp;</li>
            <li className={classes.home_header_li}>L</li>
            <li className={classes.home_header_li}>O</li>
            <li className={classes.home_header_li}>A</li>
            <li className={classes.home_header_li}>N</li>
            <li className={classes.home_header_li}>S</li>
          </ul>
        </div>
        <h2 className={classes.home_subheader}>Accounting & Risk Examples</h2>
        <div className={classes.featuresContainer}>
        <Link href="/learn" className={classes.featureBox}>
              <h3>Learn</h3>
              <p>Learn about different types of Corporate Loans, their features and the economics.</p>
            </Link>
          
            <Link href="/accounting" className={classes.featureBox}>
              <h3>Accounting Examples</h3>
              <p>Enter example loan terms to view simulated journal entries</p>
            </Link>

            <Link href="/fronting" className={classes.featureBox}>
              <h3>Fronting Risk</h3>
              <h4>Swingline Loan & Issued LC Fronting</h4>
              <p>
                Enter example loan terms to view fronting exposure calculations
              </p>
            </Link>
          
        </div>
      </main>
    </>
  );
};

export default Home;
