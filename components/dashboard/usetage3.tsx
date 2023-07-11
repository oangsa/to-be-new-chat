import {Card, Text} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import {Flex} from '../styles/flex';
export const CardBalance3 = (props: any) => {

    return (
        <Card css={{ mw: '375px', bg: '$green600', borderRadius: '$xl', px: '$6', }} >
            <Card.Body css={{py: '$10'}}>
                <Flex css={{gap: '$5'}}>
                    <Flex direction={'column'}>
                        <Text span css={{color: 'white'}}>
                            ยอดเข้าใช้งานทั้งหมด
                        </Text>
                    </Flex>
                </Flex>
                <Flex css={{gap: '$6', py: '$4'}} align={'center'}>
                    <Text span size={'$xl'} css={{color: 'white'}} weight={'semibold'} >
                        {props.props.curTotal} ครั้ง
                    </Text>
                </Flex>
            </Card.Body>
        </Card>
    );
};