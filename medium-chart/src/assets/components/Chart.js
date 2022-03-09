import React from 'react';
import api from '../API';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import '../css/chart.css';
// import {Chart, CategoryScale} from 'chart.js'; 
import { Chart, registerables } from 'chart.js';
import { render } from '@testing-library/react';

Chart.register(...registerables);

export default function ChartTest() {

  const [ dataChart, setDataChart ] = useState ( false );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log('useeffect running')
     async function fetchData(){
        let isMounted = true;  
        let confirmedCases = [];
        let dateOfCases = [];
        await api.get('/dayone/country/brazil/status/confirmed')
          .then ( response => {
            console.log('api',response.data)
            for ( let dataObj of response.data ) {
              confirmedCases.push(parseInt(dataObj.Cases));
              let tempDate = new Date (dataObj.Date);
              dateOfCases.push(tempDate.getUTCDate());
            }
           if (isMounted) setDataChart({ 
              labels: dateOfCases, 
              datasets: [{ 
                label: 'Confirmed cases', 
                data: confirmedCases 
              }]
            });
        })
        setLoading(false)
        isMounted = false
      }
      fetchData();
  }, []);
  if (loading) {
    return <p>Data is loading...</p>;
  }
    return( 
      <div className='container'>
        <h1>Confirmed Covid 19 Cases</h1>
      {dataChart?<Line data={dataChart}/>:null}
      {console.log('dc2', dataChart)}
       {/* <Line data={ dataChart }/>  */}
      </div>
    )
}