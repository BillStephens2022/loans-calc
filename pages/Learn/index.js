import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import LoanTypes from "@/components/learn/LoanTypes";
import FacilityTypes from "@/components/learn/FacilityTypes";
import Utilization from "@/components/learn/Utilization";
import classes from "@/pages/Learn/Learn.module.css";

const Learn = () => {
  const [topic, setTopic] = useState({ type: "loan", content: <LoanTypes /> });

  const handleClick = (content) => {
    setTopic(content);
  };

  return (
    <div>
      <PageHeader>
        <h1>Learn</h1>
      </PageHeader>
      <main className={classes.main}>
        <aside className={classes.aside}>
          <ul className={classes.topicsList}>
            <li
              className={`${classes.topic} ${
                topic.type === "loan" ? classes.active : ""
              }`}
              onClick={() =>
                handleClick({ type: "loan", content: <LoanTypes /> })
              }
            >
              Types of Loans
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
          </ul>
        </aside>
        <div className={classes.contentContainer}>{topic.content}</div>
      </main>
    </div>
  );
};

export default Learn;
