import React from 'react';
import {Text} from '@nextui-org/react';
import {Box} from '../styles/box';
import dynamic from 'next/dynamic';
import {Flex} from '../styles/flex';
import {CardBalance1} from './usetage1';
import {CardBalance2} from './usetage2';
import {CardBalance3} from './usetage3';
import {RecentUse} from './recentusetage';
// import {CardAgents} from './card-agents';
// import {CardTransactions} from './card-transactions';

const Chart = dynamic(
   () => import('./chart').then((mod) => mod.Steam),
   {
      ssr: false,
   }
);

export const Content = () => {
   
   const [data, setData] = React.useState({
      curTotal: 0,
      curDay:  0,
      curMonth: 0,
  
      oldDay: 0,
      oldMonth: 0,
   })

   const getD = async () => {
      const res = await fetch("/api/usetage/getUsetage", { next: { revalidate: 5 } })
      const data = await res.json()
      await setData(data)
   }

   React.useEffect(() => {
      getD();
   }, [])

   return (
      <Box css={{overflow: 'hidden', height: '100%'}}>
         <Flex css={{ 'gap': '$8', 'pt': '$5', 'height': 'fit-content', 'flexWrap': 'wrap', '@lg': { flexWrap: 'nowrap', }, '@sm': { pt: '$10'}, }} justify={'center'} >
            <Flex css={{ 'px': '$12', 'mt': '$8', '@xsMax': {px: '$10'}, 'gap': '$12', }} direction={'column'} >
               <Box>
                  <Text h3 css={{ 'textAlign': 'center', '@sm': { textAlign: 'inherit', }, }} >
                     ข้อมูล
                  </Text>
                  <Flex css={{ 'gap': '$10', 'flexWrap': 'wrap', 'justifyContent': 'center', '@sm': { flexWrap: 'nowrap', }, }} direction={'row'} >
                  <CardBalance3 props={data} />
                  <CardBalance1 props={data} />
                  <CardBalance2 props={data}/>
                  </Flex>
               </Box>
               <Box>
                  <Text h3 css={{ 'textAlign': 'center', '@lg': { textAlign: 'inherit', }, }} >
                     ภาพรวมข้อมูล
                  </Text>
                  <Box css={{ width: '100%', backgroundColor: '$accents0', boxShadow: '$lg', borderRadius: '$2xl', px: '$10', py: '$10', }} >
                     <Chart />
                  </Box>
               </Box>
            </Flex>
            <Box css={{ 'px': '$12', 'mt': '$8', 'height': 'fit-content', '@xsMax': {px: '$10'}, 'gap': '$6', 'overflow': 'hidden', }} >
               <Text h3
                  css={{ 'textAlign': 'center', '@lg': { textAlign: 'inherit', }, }} >
                  {"การใช้งานล่าสุด"}
               </Text>
               <Flex direction={'column'} justify={'center'} css={{ 'gap': '$8', 'flexDirection': 'row', 'flexWrap': 'wrap', '@sm': { flexWrap: 'nowrap', }, '@lg': { flexWrap: 'nowrap', flexDirection: 'column', }, }} >
                  <RecentUse />
               </Flex>
            </Box>
         </Flex>
      </Box>
   )
}