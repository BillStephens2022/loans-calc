import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


// Pie chart component using the external react-chartjs-2 library
// renders a Pie Chart based on the Loan Examples Data from the accounting page
// Pie chart shows the breakdown of the commitments by accounting methodology (HFI, HFS, FVO)

ChartJS.register(ArcElement, Tooltip, Legend);

// props are the total commitment amounts by accounting methodology
const AccountingPieChart = ({ totalCommitmentHFI, totalCommitmentHFS, totalCommitmentFVO }) => {

  const data = {
    labels: ['HFI Commitments', 'HFS Commitments', 'FVO Commitments'],
    datasets: [
      {
        label: '# of Votes',
        data: [totalCommitmentHFI, totalCommitmentHFS, totalCommitmentFVO],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />
}

export default AccountingPieChart;

