import { Modal, useModal, Button, Text } from "@nextui-org/react";
import { SidebarItem } from "./sidebar-item";
import {ChangeLogIcon} from '../icons/sidebar/changelog-icon';
import { ChangeLogItem } from "./changeLog-item";
import { Inter, Kanit } from 'next/font/google'
const kanit = Kanit({ subsets: ['latin', 'thai'], weight: '400' })
export default function ChangeLog() {
    const { setVisible, bindings } = useModal();
    return (
        <div>
            <ChangeLogItem click={() => setVisible(true)} title="Changelog" icon={<ChangeLogIcon />} />
            <Modal className={kanit.className} scroll width="600px" aria-labelledby="modal-title" aria-describedby="modal-description" {...bindings} >
                <Modal.Header>
                <Text span id="modal-title" size={18}>
                    เวอร์ชั่น: 2.1.0
                </Text>
                </Modal.Header>
                <Modal.Body>
                    <Text span id="modal-description">
                        ⌛ อัพเดตล่าสุด 12 ก.ค. 2566
                    </Text>
                    <Text span>
                        - Change To Page Router (Next.js 13)
                    </Text>
                    <Text span>
                        - Prepare Function For Chat Function
                    </Text>
                </Modal.Body>
                <Modal.Footer>
                    <Text span>
                        Developed With ❤️ By: Suthang Sukrueangkun
                    </Text>
                </Modal.Footer>
                <Button css={{'mb': '$5', 'ml': '$5', 'mr': '$5'}} auto onPress={() => setVisible(false)}>
                        ปิด
                </Button>
            </Modal>
        </div>
    );
}
