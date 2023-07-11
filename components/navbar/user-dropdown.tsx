import {Avatar, Dropdown, Link, Navbar, Text} from '@nextui-org/react';
import React from 'react';
import {DarkModeSwitch} from './darkmodeswitch';
import { usePathname, useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import { Inter, Kanit } from 'next/font/google'
const kanit = Kanit({ subsets: ['latin', 'thai'], weight: '400' })

interface props {
   image: string,
   name: string
}

export const UserDropdown = ({image, name}: props) => {
   const router = useRouter()
   const pathname = usePathname()
   var url = image
   
   if ( image === 'url' || image === '' ) url = 'https://i.pravatar.cc/150?u=a042581f4e29026704d'

   async function logoutClicked() {
      deleteCookie("user-token")
      setTimeout(() => window.location.reload(), 1000)
      return
   }


   return (
      <Dropdown placement="bottom-right">
         <Navbar.Item>
            <Dropdown.Trigger>
               <Avatar bordered as="button" color="secondary" size="md" src={url} />
            </Dropdown.Trigger>
         </Navbar.Item>
         <Dropdown.Menu aria-label="User menu actions" onAction={(actionKey) => {
            if (actionKey === 'logout') return logoutClicked()
            console.log(actionKey)
         }} >
            <Dropdown.Item className={kanit.className} key="profile" css={{height: '$18'}}>
               <Text b color="inherit" css={{d: 'flex'}}>
                  ลงชื่อเข้าใช้เป็น
               </Text>
               <Text b color="inherit" css={{d: 'flex'}}>
                  {name}
               </Text>
            </Dropdown.Item>
            <Dropdown.Item className={kanit.className} key="settings" withDivider>
               <Link color={'text'} href='/setting'>
                  ตั้งค่า
               </Link>
            </Dropdown.Item>
            <Dropdown.Item className={kanit.className}  key="logout" withDivider color="error">
               ลงชื่อออก
            </Dropdown.Item>
            <Dropdown.Item className={kanit.className} key="switch" withDivider>
               <DarkModeSwitch />
            </Dropdown.Item>
         </Dropdown.Menu>
      </Dropdown>
   );
};
