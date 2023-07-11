import {Avatar, Card, Text} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import {Flex} from '../styles/flex';

export const RecentUse = () => {
    const [isDoneLoading, setIsDoneLoading] = useState<boolean>(false) 
    const [data, setData] = useState<any[]>([])

    const getrecent = async() => {
        const res = await fetch("/api/usetage/getrecent")
        const jsonData = await res.json()
        await setData(jsonData)
        setIsDoneLoading(true)
    }

    useEffect(() => {
        getrecent()
    }, [])



    return (
        <Card css={{ mw: '375px', height: 'auto', bg: '$accents0', borderRadius: '$xl', justifyContent: 'start', px: '$6', }} >
            <Card.Body css={{py: '$10'}}>
                <Flex css={{gap: '$5'}} justify={'center'}>
                
                </Flex>
                <Flex css={{gap: '$6', py: '$4'}} direction={'column'} >
                    {isDoneLoading === false ? "Loading..." : 
                        data.map((item:any) => {
                            var url = item.image 

                            if( item.image === 'url' || item.image === '' ) url = 'https://i.pravatar.cc/150?u=a042581f4e29026024d'

                            console.log(url)
                            return (
                            <Flex key={item.studentId} css={{gap: '$6'}} align={'center'} justify="between">
                                <Avatar size="lg" pointer src={url} bordered color="gradient" stacked />
                                <Text span size={'$xs'} weight={'semibold'}>
                                    {item.name} {item.surname}
                                </Text>
                                <Text span css={{color: '$green600'}} size={'$xs'}>
                                    เหตุผล: {item.reason}
                                </Text>
                                <Text span css={{color: '$accents8'}} size={'$xs'}>
                                    {new Date(item.timestamps).toLocaleString("th-TH", {timeZone: "Asia/Bangkok"}).split(" ")[1].split(":")[0]}:{new Date(item.timestamps).toLocaleString("th-TH", {timeZone: "Asia/Bangkok"}).split(" ")[1].split(":")[1]}
                                </Text>
                            </Flex>
                        )})
                    } 
                </Flex>
            </Card.Body>
        </Card>
    );
};