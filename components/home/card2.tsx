import {Card, Text} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import {Flex} from '../styles/flex';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { CookieValueTypes, getCookie } from 'cookies-next';

export const GreetCard = (props:any) => {
    const router: AppRouterInstance = useRouter()
    const [isDoneLoading, setIsDoneLoading] = useState<boolean>(false)
    const [isCookie, setIsCookie] = useState<boolean>(false)

    const getD = async () => {
        const cookie: CookieValueTypes | undefined = getCookie("user-token")
        if (cookie === undefined) return setIsCookie(false)
        return setIsCookie(true)
    }

    useEffect(() => {
        getD()
    })
    
    return (
        <Card css={{ w: '600px', mw: '375px', bg: 'white', borderRadius: '$xl', px: '$6', }} >
            <Card.Body css={{py: '$10'}}>
            { props?.props === undefined && isCookie === false ? 
                <Text span css={{color: 'black'}} size={'$2xl'}>
                    กรุณาลงชื่อเข้าใช้
                </Text>
            : ( isCookie === true && props?.props === undefined ) ? 
                <Text span css={{color: 'black'}} size={'$lg'}>
                    loading...
                </Text>  
            : 
                <>
                    <Flex css={{gap: '$5'}}>
                        <Flex css={{gap: '$12'}} align={'center'}>
                            <Text span css={{color: 'black'}} size={'$lg'}>
                                สวัสดี {props.props.name} {props.props.surname} 👋
                            </Text>
                        </Flex>
                    </Flex>
                </>
            }
            </Card.Body>
        </Card>
    );
};