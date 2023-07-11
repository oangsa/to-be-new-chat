import React, { useEffect, useState } from 'react';
import {Text} from '@nextui-org/react';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';
import { UsetageCard } from './card1';
import { GreetCard } from './card2';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { useRouter } from 'next/navigation';
import getDataByCookie from '@/libs/getDataByCookie';


export const Content = () => { 
   const router: AppRouterInstance = useRouter()
   const [data, setData] = useState<any>()

   const getD = async () => {
      const res = await getDataByCookie()
      return setData(res)
   }

   useEffect(() => {
       getD()
   })
   
   return (
      <Box css={{overflow: 'hidden', height: '100%'}}>
         <Flex css={{ 'gap': '$8', 'pt': '$5', 'height': 'fit-content', 'flexWrap': 'wrap', '@lg': { flexWrap: 'nowrap', }, '@sm': { pt: '$10'}, }} justify={'center'} >
            <Flex css={{ 'px': '$12', 'mt': '$8', '@xsMax': {px: '$10'}, 'gap': '$12', }} direction={'column'} >
               <Box>
                  <Text h3 css={{ 'textAlign': 'center', '@sm': { textAlign: 'inherit', }, }} >
                     ข้อมูล
                  </Text>
                  <Flex css={{ 'gap': '$10', 'flexWrap': 'wrap', 'justifyContent': 'center', '@sm': { flexWrap: 'nowrap', }, }} direction={'row'} >
                     <GreetCard props={data}/>
                     <UsetageCard props={data}/>
                  </Flex>
               </Box>
            </Flex>
            <Box css={{ 'px': '$12', 'mt': '$8', 'height': 'fit-content', '@xsMax': {px: '$10'}, 'gap': '$6', 'overflow': 'hidden', }} >
            </Box>
         </Flex>
      </Box>
   )
}