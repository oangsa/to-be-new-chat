import React, {useEffect, useState} from 'react';
import {Box} from '../styles/box';
import {Sidebar} from './sidebar.styles';
import {Flex} from '../styles/flex';
import {HomeIcon} from '../icons/sidebar/home-icon';
import {DashboardIcon} from '../icons/sidebar/dashboard-icon';
import {AccountsIcon} from '../icons/sidebar/accounts-icon';
import {SettingsIcon} from '../icons/sidebar/settings-icon';
import {SidebarItem} from './sidebar-item';
import {SidebarMenu} from './sidebar-menu';
import {useSidebarContext} from '@/components/layout/layout-context';
import {useRouter, usePathname} from 'next/navigation';
import Image from "next/image";
import Logo from "../../public/Logo.png"
import checkCookie from '@/libs/checkCookie';
import ChangeLog from './changeLog';
import { ChangeLogIcon } from '../icons/sidebar/changelog-icon';

export default function SidebarWrapper() {
   const pathname = usePathname()
   const {collapsed, setCollapsed} = useSidebarContext()
   const [isAdmin, setIsAdmin] = useState<boolean>(false)

   function checkIsDev() {
      const raw = checkCookie()
      if (raw === undefined) return
      return setIsAdmin(raw?.isAdmin === true ? true : false)

   }

   useEffect(() => {
      checkIsDev()
   }, [])

   return (
      <Box
         as="aside"
         css={{
            height: '100vh',
            zIndex: 202,
            position: 'sticky',
            top: '0',
         }}
      >
         {collapsed ? <Sidebar.Overlay onClick={setCollapsed} /> : null}

         <Sidebar collapsed={collapsed}>
            <Sidebar.Header>
                <Image width={150} height={150} src={Logo} alt="company logo" />
            </Sidebar.Header>
            <Flex
               direction={'column'}
               justify={'between'}
               css={{height: '100%'}}
            >
               <Sidebar.Body className="body sidebar">
                  <SidebarMenu title="ทั่วไป">
                     <SidebarItem
                        title="หน้าหลัก"
                        icon={<HomeIcon />}
                        isActive={pathname === '/'}
                        href="/"
                     />
                     <SidebarItem
                        isActive={pathname === '/setting'}
                        title="ตั้งค่า"
                        icon={<SettingsIcon />}
                        href='/setting'
                     />
                     {/* <SidebarItem
                        isActive={pathname === '/chat'}
                        title="แชท"
                        icon={<ChatIcon />}
                        href='/chat'
                     /> */}
                  </SidebarMenu>
                  
                  {isAdmin && <SidebarMenu title="แอดมิน">
                     <SidebarItem
                        isActive={pathname === '/admin/studentlist'}
                        title="รายชื่อนักเรียน"
                        icon={<AccountsIcon />}
                        href="/admin/studentlist"
                     />
                     <SidebarItem
                        isActive={pathname === '/admin/dashboard'}
                        title="แผงควบคุม"
                        icon={<DashboardIcon />}
                        href="/admin/dashboard"
                     />
                  </SidebarMenu>}
                  <SidebarMenu title="อัพเดต">
                     <ChangeLog/>
                  </SidebarMenu>
               </Sidebar.Body>
            </Flex>
         </Sidebar>
      </Box>
   );
};
