import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import LoanTypes from "@/components/learn/LoanTypes";
import FacilityTypes from "@/components/learn/FacilityTypes";
import Utilization from "@/components/learn/Utilization";
import classes from "@/pages/Learn/Learn.module.css";


const Learn = () => {
    const [topic, setTopic] = useState(<LoanTypes />);

    return (
        <div>
            <PageHeader><h1>Learn</h1></PageHeader>
            <main className={classes.main}>
                <aside className={classes.aside}>
              
                  <ul className={classes.topicsList}>
                    <li className={classes.topic} onClick={() => setTopic(<LoanTypes />)}>Types of Loans</li>
                    <li className={classes.topic} onClick={() => setTopic(<FacilityTypes />)}>Facility Types</li>
                    <li className={classes.topic} onClick={() => setTopic(<Utilization />)}>Utilization</li>
                  </ul>
                </aside>
                <div className={classes.contentContainer}>
                    {topic}
                </div>
            </main>
        </div>
    )
}

export default Learn;