import React, { useEffect } from 'react';
import {Box} from '../styles/box';
import Chart from 'react-apexcharts';
import { useTheme } from '@nextui-org/react';
import prisma from '@/libs/prismadb'

interface usetage {
    month: number[],
    total: number[]
}


export const Steam = () => {

   const [use, setUse] = React.useState<usetage>({
      month: [],
      total: []
   })

   const getD = async () => {
        const res = await fetch("/api/usetage/getusetagebyyear")
        const data = await res.json()
        console.log(data)
        setUse({
            month: data.month,
            total: data.total
        })
   }

   const primary = "#0072F5";
   const secondary = "#7828C8";

   const optionscolumnchart: any = {
      chart: {
          type: 'bar',
          fontFamily: "'Plus Jakarta Sans', sans-serif;",
          foreColor: '#adb0bb',
          toolbar: {
              show: true,
          },
          height: 370,
      },
      colors: [primary, secondary],
      plotOptions: {
          bar: {
              horizontal: false,
              barHeight: '60%',
              columnWidth: '42%',
              borderRadius: [6],
              borderRadiusApplication: 'end',
              borderRadiusWhenStacked: 'all',
          },
      },

      stroke: {
          show: true,
          width: 5,
          lineCap: "butt",
          colors: ["transparent"],
        },
      dataLabels: {
          enabled: false,
      },
      legend: {
          show: false,
      },
      grid: {
          borderColor: 'rgba(0,0,0,0.1)',
          strokeDashArray: 3,
          xaxis: {
              lines: {
                  show: false,
              },
          },
      },
      yaxis: {
          tickAmount: 4,
      },
      xaxis: {
          categories: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'],
          axisBorder: {
              show: false,
          },
      },
      tooltip: {
          fillSeriesColor: false,
      },
   };

   useEffect(() => {
      getD()
   }, [])


   const seriescolumnchart: any[] = [
         {
            name: 'Month Use',
            data:  use.month,
         },
         {
            name: 'All use',
            data: use.total,
         },
   ];

   return (
      <>
         <Box css={{ width: '100%', zIndex: 5, }} >
            <div id="chart">
               <Chart
                  options={optionscolumnchart}
                  series={seriescolumnchart}
                  type="bar"
                  height={425}
               />
            </div>
         </Box>
      </>
   );
};