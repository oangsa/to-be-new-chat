import React, {ChangeEvent, useEffect, useState} from 'react'
import { Modal, Button, Input, Row, Container, Col, Spacer } from "@nextui-org/react";
import { IconButton } from '@/pages/admin/table.styled';
import { EditIcon } from '../icons/table/edit';
import Swal from 'sweetalert2';
import { studentData } from '@/type';
import { Inter, Kanit } from 'next/font/google'
const kanit = Kanit({ subsets: ['latin', 'thai'], weight: '400' })


interface props {
    studentId: number
}

function EditUser(props: props) {
    const [visible, setVisible] = useState<boolean>(false);
    const [data, setData] = useState<studentData>({
        id: "",
        name: "",
        surname: "",
        studentId: 0,
        yearClass: 0,
        Class: 0,
        reason: "",
        total: 0,
        oldMonth: 0,
        timestamps: new Date(),
        username: "",
        password: "",
        image: "",
    });
    const handler = () => setVisible(true);
    
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData((prev) => ({...prev, [name]: value}))
        console.log( name, value )
    }

    const closeHandler = () => {
      setVisible(false);
      console.log("closed");
    };

    async function getUserById(sid: number) {
        const res = await fetch(`/api/user/getuserbysid?sid=${sid.toString()}`)

        setData(await res.json())

    }

    async function submit() {
        setVisible(false);
        console.log("closed");
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true ,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then(async (result) => {
            if (result.isConfirmed) {
                //62763
                const res = await fetch("/api/user/edit", {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: data.name, 
                        surname: data.surname, 
                        yearClass: data.yearClass, 
                        studentId: data.studentId, 
                        Class: data.Class, 
                        username: data.username, 
                        password: data.password, 
                        imageUrl: data.image === "url" ? "" : data.image, 
                        isUserUpdate: "false",
                        updateUser: props.studentId
                    })
                })
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-right',
                    customClass: {
                      popup: 'colored-toast'
                    },
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true
                })
                if (await res.json() !== "Success") return await Toast.fire({ icon: 'error', title: 'Faild!'})
                return await Toast.fire({ icon: 'success', title: 'Done!' })
            }
          })
    }

    useEffect(() => {
        getUserById(props.studentId)
    }, [])

    return (
        <>
            <IconButton onClick={() => setVisible(true)}>
                <EditIcon size={20} fill="#979797" />
            </IconButton>
            <Modal className={kanit.className} closeButton aria-labelledby="edit-modal" open={visible} onClose={closeHandler} >
                <Modal.Body>
                    <div className="flex justify-between items-center mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            📝 แก้ไขข้อมูลทั่วไป
                        </h3>
                    </div>                
                    <Container gap={0}>
                        <Row gap={0.3}>
                            <Col onInput={inputHandler}>
                                <Input onInput={inputHandler} value={data.name} label='ชื่อ' name="name" fullWidth placeholder="Email" />
                            </Col>
                            <Col>
                                <Input onInput={inputHandler} value={data.surname} label='นามสกุล' name="surname" fullWidth placeholder="Email" />
                            </Col>
                        </Row>
                        <Spacer y={1}/>
                        <Row gap={0.3}>
                            <Col>
                                <Input onInput={inputHandler} value={data.studentId} label='รหัสประจำตัวนักเรียน' name="studentId" fullWidth placeholder="Email" />
                            </Col>
                            <Col>
                                <Input onInput={inputHandler} value={data.yearClass} label='ชั้นปี' name="yearClass" fullWidth placeholder="Email" />
                            </Col>
                        </Row>
                        <Spacer y={1}/>
                        <Row gap={0.3}>
                            <Col>
                                <Input onInput={inputHandler} value={data.Class} label='ห้อง' name="Class" fullWidth placeholder="Email" />
                            </Col>
                        </Row>
                        <Spacer y={2}/>
                        <div className="flex justify-between items-center mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                📝 แก้ไขข้อมูลล็อคอิน
                            </h3>
                        </div>
                        <Row gap={0.3}>
                            <Col>
                                <Input onInput={inputHandler} value={data.username} label='ชื่อผู้ใช้' name="username" fullWidth placeholder="Email" />
                            </Col>
                            <Col>
                                <Input.Password onInput={inputHandler} value={data.password} label='รหัสผ่าน' name="password" fullWidth placeholder="Email" />
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button auto flat color="error" onPress={closeHandler}>
                    ปิด
                </Button>
                <Button auto onPress={submit}>
                    บันทึก
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditUser