import { useState } from "react";
import PageHeader from "../../components/layout/pageHeader";
import LoanTypes from "../../components/learn/loanTypes";
import LoanDocs from "../../components/learn/loanDocs";
import FacilityTypes from "../../components/learn/facilityTypes";
import Utilization from "../../components/learn/utilization";
import FeeTypes from "../../components/learn/feeTypes";
import Trades from "../../components/learn/trades";
import Fronting from "../../components/learn/fronting";
import Accounting from "../../components/learn/accounting";
import classes from "./learn.module.css";

const Learn = () => {
  const [topic, setTopic] = useState({ type: "loan", content: <LoanTypes /> });

  const handleClick = (content) => {
    setTopic(content);
  };

  return (
    <div>
      <PageHeader>
        <h1 className={classes.pageHeader}>Learn</h1>
      </PageHeader>
      <main className={classes.main}>
        <aside className={classes.aside}>
          <h3 className={classes.topicsList_header}>Topics</h3>
          <ul className={classes.topicsList}>
            <li
              className={`${classes.topic} ${
                topic.type === "loan" ? classes.active : ""
              }`}
              onClick={() =>
                handleClick({ type: "loan", content: <LoanTypes /> })
              }
            >
              Loan Types
            </li>
            <li
              className={`${classes.topic} ${
                topic.type === "loanDocs" ? classes.active : ""
              }`}
              onClick={() =>
                handleClick({ type: "loanDocs", content: <LoanDocs /> })
              }
            >
              Loan Docs
            </li>
            <li
              className={`${classes.topic} ${
                topic.type === "facility" ? classes.active : ""
              }`}
              onClick={() =>
                handleClick({ type: "facility", content: <FacilityTypes /> })
              }
            >
              Facility Types
            </li>
            <li
              className={`${classes.topic} ${
                topic.type === "utilization" ? classes.active : ""
              }`}
              onClick={() =>
                handleClick({ type: "utilization", content: <Utilization /> })
              }
            >
              Utilization
            </li>
            <li
              className={`${classes.topic} ${
                topic.type === "fees" ? classes.active : ""
              }`}
              onClick={() =>
                handleClick({ type: "fees", content: <FeeTypes /> })
              }
            >
              Interest & Fees
            </li>
            <li
              className={`${classes.topic} ${
                topic.type === "trades" ? classes.active : ""
              }`}
              onClick={() =>
                handleClick({ type: "trades", content: <Trades /> })
              }
            >
              Trades
            </li>
            
            <li
              className={`${classes.topic} ${
                topic.type === "Fronting" ? classes.active : ""
              }`}
              onClick={() =>
                handleClick({ type: "fronting", content: <Fronting /> })
              }
            >
              Fronting
            </li>
            <li
              className={`${classes.topic} ${
                topic.type === "Accounting" ? classes.active : ""
              }`}
              onClick={() =>
                handleClick({ type: "accounting", content: <Accounting /> })
              }
            >
              Accounting
            </li>
          </ul>
        </aside>
        <div className={classes.contentContainer}>{topic.content}</div>
      </main>
    </div>
  );
};

export default Learn;
