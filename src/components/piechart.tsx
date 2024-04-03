import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { PIE_DATA } from '../assets/constant/constant';
ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart() {
    return <Pie data={PIE_DATA}/>;
}
