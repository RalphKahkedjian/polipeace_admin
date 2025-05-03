import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"; // 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export default function Party_Affiliation_Graph() {
  const [partyCounts, setPartyCounts] = useState({
    Ouwet: 0,
    Aoun: 0,
    Dashnak: 0,
    Kataeb: 0,
    Hezbollah: 0,
    HaraketAmal: 0,
    MaradaMovement: 0,
    ProgressiveSocialistParty: 0
  });
  useEffect(() => {
    axiosClient.get('/User/Users')
      .then(({ data }) => {
        let newPartyCounts = { ...partyCounts };
  
        data.users.forEach((user: { party_affiliation: any; }) => {
          const party = user.party_affiliation?.toLowerCase();
  
          switch (party) {
            case 'ouwet':
              newPartyCounts.Ouwet++;
              break;
            case 'aoun':
              newPartyCounts.Aoun++;
              break;
            case 'dashnak':
              newPartyCounts.Dashnak++;
              break;
            case 'kataeb':
              newPartyCounts.Kataeb++;
              break;
            case 'hezbollah':
              newPartyCounts.Hezbollah++;
              break;
            case 'haraketamal':
              newPartyCounts.HaraketAmal++;
              break;
            case 'maradamovement':
              newPartyCounts.MaradaMovement++;
              break;
            case 'progressivesocialistparty':
              newPartyCounts.ProgressiveSocialistParty++;
              break;
            default:
              break;
          }
        });
  
        setPartyCounts(newPartyCounts);
      })
      .catch(err => {
        console.log("An error occurred while fetching users: ", err);
      });
  }, []);
  

  const chartData = {
    labels: Object.keys(partyCounts),
    datasets: [
      {
        label: 'Party Affiliation Count',
        data: Object.values(partyCounts),
        backgroundColor: [
          '#4B1F3E'
        ],
        borderColor: [
          'rgba(199, 199, 199, 1)',
        ],
        
        borderWidth: 1
      }
    ]
  };


  return (
    <div>
      <Bar data={chartData}  style={{
        width:'60%',
        height:'30em'
      }} />
    </div>
  );
}
