import React, { useState } from "react";
import Link from "next/link";
import PageHeader from "../../components/layout/pageHeader";
import LoanTypes from "../../components/learn/loanTypes";
import LoanDocs from "../../components/learn/loanDocs";
import FacilityTypes from "../../components/learn/facilityTypes";
import Utilization from "../../components/learn/utilization";
import FeeTypes from "../../components/learn/feeTypes";
import Trades from "../../components/learn/trades";
import Fronting from "../../components/learn/fronting";
import Accounting from "../../components/learn/accounting";
import Button from "../../components/ui/button";
import classes from "./learn.module.css";

// page route: /learn
// Learning Page summary - User can click on item in topic list (viewed as tabs) to view
// educational content about specific loan topics.  Click the button to take quiz to navigate
// to the Quiz page which features a multiple choice quiz.

// type to be used creating a list of learning topic items along with the associated
// React component containing the learning content
interface TopicItem {
  label: string,
  content: React.ReactNode
}

const Learn: React.FC = () => {
  // state to set the topic for which content will be rendered
  const [activeTopic, setActiveTopic] = useState<string>("Loan Types");

  // list of topics to iterated over to render the topics list and the associated content to
  // be rendered when list item clicked
  const topicsList: TopicItem[] = [
    { label: "Loan Types", content: <LoanTypes /> },
    { label: "Loan Docs", content: <LoanDocs /> },
    { label: "Facility Types", content: <FacilityTypes /> },
    { label: "Utilization", content: <Utilization /> },
    { label: "Interest & Fees", content: <FeeTypes /> },
    { label: "Trades", content: <Trades /> },
    { label: "Fronting", content: <Fronting /> },
    { label: "Accounting", content: <Accounting /> },
  ];

  // handler for setting which content is rendered based on what button is clicked
  const handleTopicSelection = (label: string) => {
    setActiveTopic(label);
  };

  return (
    <div>
      <PageHeader>
        <h1 className={classes.pageHeader}>Learn</h1>

        <Link href="/quiz">
          <Button className="m_1">Take Quiz</Button>
        </Link>
      </PageHeader>
      <main className={classes.main}>
        <aside className={classes.aside}>
          <h3 className={classes.topicsList_header}>Topics</h3>

          {/* clickable topic list which renders content based on which list item is clicked */}
          <ul className={classes.topicsList}>

            {/* Iterate over topic list to render the clickable topic list items */}
            {topicsList.map((item, index) => (
              <li
                key={index}
                className={`${classes.topic} ${
                  activeTopic === item.label ? classes.active : ""
                }`}
                onClick={() => handleTopicSelection(item.label)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </aside>
        <div className={classes.contentContainer}>{topicsList.find((topic) => topic.label === activeTopic)?.content}</div>
      </main>
    </div>
  );
};

export default Learn;
