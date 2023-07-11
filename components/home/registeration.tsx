import React, {ChangeEvent, useState} from 'react'
import { Modal, Button, Input, Row, Container, Col, Spacer, Loading } from "@nextui-org/react";
import { IconButton } from '@/pages/admin/table.styled';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { Inter, Kanit } from 'next/font/google'
const kanit = Kanit({ subsets: ['latin', 'thai'], weight: '400' })

interface props {
    studentId: number
}

interface leaveModal {
    name: string,
    surname: string,
    month: number
}

interface leaveFrom {
    other: string
    reason: string
}

function Registeration({name, surname, month}:leaveModal) {
    const [visible, setVisible] = useState<boolean>(false);
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [data, setData] = useState<leaveFrom>({
        reason: "เลือกเหตุผล",
        other: ""
    })

    const reason = data.reason === "อื่นๆ" ? data.other : data.reason
       
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

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        console.log(name, value)
        setData((prev) => ({...prev, [name]: value}))
    }

    async function submit() {
        setVisible(false);
        Swal.fire({
            title: 'แน่ใจนะ?',
            text: "",
            icon: 'warning',
            showCancelButton: true ,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then(async (result) => {
            if (result.isConfirmed) {
                setIsClicked(true)
                setVisible(true);
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
                

                if (reason === "" || reason === "เลือกเหตุผล") return await Toast.fire({ icon: 'error', title: 'Faild!'})

                const res = await fetch("/api/handler/senddata", {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        surname: surname,
                        oldMonth: month,
                        other: reason
                    })
                })
                console.log(await res.status)
                setIsClicked(false)
                setVisible(false);
                if (await res.status !== 200) await Toast.fire({ icon: 'error', title: 'Faild!'})
                setData({
                    other: "",
                    reason: ""
                })
                return await Toast.fire({ icon: 'success', title: 'Done!' })
            }
          })
    }

    return (
        <div>
            <IconButton>
                <Button color={'gradient'} onClick={handler}>ลงทะเบียน</Button>
            </IconButton>
            <Modal className={kanit.className} closeButton aria-labelledby="modal-title" open={visible} onClose={closeHandler} >
                <Modal.Body>
                    <div className="flex justify-between items-center mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            📝 ลงทะเบียน
                        </h3>
                    </div>                
                    <Container gap={0}>
                        <Row gap={0.3}>
                            <Col onInput={inputHandler}>
                                <Input readOnly value={name} label='ชื่อ' name="name" fullWidth placeholder="นราวิชญ์" />
                            </Col>
                            <Col>
                                <Input readOnly value={surname} label='นามสกุล' name="surname" fullWidth placeholder="ใจรักมั่น" />
                            </Col>
                        </Row>
                        <Spacer y={1}/>
                        <Row gap={0.3}>
                            <Col>
                                <div className="grid gap-4 mb-4 sm:grid-cols-1">
                                    <label htmlFor="reason" className="block text-sm font-medium text-gray-900 dark:text-white">ระบุเหตุผล</label>
                                    <select onChange={handleSelect} value={data.reason} name="reason" id="reason" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                        <option disabled>เลือกเหตุผล</option>
                                        <option value="ปรับทุกข์">ปรับทุกข์</option>
                                        <option value="สร้างสุข">สร้างสุข</option>
                                        <option value="แก้ไขปัญหา">แก้ไขปัญหา</option>
                                        <option value="พัฒนา EQ">พัฒนา EQ</option>
                                        <option value="อื่นๆ">อื่นๆ</option>
                                    </select> 
                                </div>
                                <div className="grid gap-4 mb-4 sm:grid-cols-1">
                                    { data.reason !== "อื่นๆ" ? "" : 
                                        <div>
                                            <label htmlFor="other" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">โปรดระบุ</label>
                                            <input value={data.other} onChange={inputHandler} type="text" name="other" id="other" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="ติดเกม..." required />
                                        </div>
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                {
                    isClicked === false && 
                    <Button auto flat color="error" onPress={closeHandler}>
                        ปิด
                    </Button>
                }
                {
                    isClicked === true ? 
                    <Button auto disabled>
                        <Loading type="spinner" color="currentColor" size="md" />
                    </Button> :
                    <Button auto onPress={submit}>
                        ลงชื่อเข้าใช้
                    </Button>
                }
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Registeration