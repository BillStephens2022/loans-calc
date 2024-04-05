import React from "react";
import Image from "next/image";
import bank from "../../public/bank.png"
import classes from "./loader.module.css";

interface LoaderProps {
  loadingText: string;
}

const Loader: React.FC<LoaderProps> = ({ loadingText }) => {
  return (
    <div className={classes.container}>
      <h2 className={classes.loading_header}>{ loadingText } </h2>
      <Image
        src={bank}
        alt="bank"
        width={300}
        height={300}
        placeholder="blur"
        style={{ objectFit: "contain" }}
        className={classes.logo}
      ></Image>
    </div>
  );
};

export default Loader;