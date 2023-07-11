import { Card, Col, Container, Row, Table, Tooltip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { IconButton } from "../../styles/table.styled";
import { DeleteIcon } from "@/components/icons/table/delete";
import Swal from "sweetalert2";
import EditUser from "@/components/users/editUser";
import AddUser from "@/components/users/addUser";
import { deleteIsPressed } from "@/libs/manageUser";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";
export const revalidate = 60 

export default function AdminList() {
    const router: AppRouterInstance = useRouter()
    const [data, setData] = useState<any[]>([])

    async function get() {
        const data:any = await fetch("/api/user/getList")
        const d: any = await data.json()
        console.log(d)
        await setData(d)
    }

    async function delBtn(sid: number) {
        Swal.fire({
            title: 'แน่ใจนะ?',
            text: "ลบแล้วลบเลยนะ!",
            icon: 'warning',
            showCancelButton: true ,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then(async (result) => {
            if (result.isConfirmed) {

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

                if( await deleteIsPressed(sid) !== 200 ) return await Toast.fire({ icon: 'error', title: 'Failed!' })
                router.refresh()
                return await Toast.fire({ icon: 'success', title: 'Done!' })
            }
        })    
    }

    useEffect(() => {
        get()
    }, [])



    return (
        <>
            <Container css={{"p": "$10"}}>
                <Card>
                    <Card.Header>
                        <div className="item-center justify justify-center">
                            <h1 className="mt-2 ml-1 text-xl sm:text-2xl text-gray-900 dark:text-white">รายชื่อนักเรียน</h1>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                            <AddUser></AddUser>
                        </div>
                    </Card.Header>
                    <Card.Divider/>
                    <Card.Body>
                        <Table bordered striped shadow={false} color="primary" aria-label="List" css={{ height: "auto", minWidth: "100%", }} >
                        <Table.Header>
                            <Table.Column>เลขประจำตัวนักเรียน</Table.Column>
                            <Table.Column>ชื่อ</Table.Column>
                            <Table.Column>นามสกุล</Table.Column>
                            <Table.Column>ชั้น/ห้อง</Table.Column>
                            <Table.Column>เข้าใช้ทั้งหมด</Table.Column>
                            <Table.Column>{}</Table.Column>
                        </Table.Header>
                        <Table.Body>
                        {data.map((item: any) => {
                            return (
                                <Table.Row key={item.studentId}>
                                    <Table.Cell>{item.studentId}</Table.Cell>
                                    <Table.Cell>{item.name}</Table.Cell>
                                    <Table.Cell>{item.surname}</Table.Cell>
                                    <Table.Cell>{item.yearClass}/{item.Class}</Table.Cell>
                                    <Table.Cell>{item.total} ครั้ง</Table.Cell>
                                    <Table.Cell>
                                        <Row justify="center" align="center" css={{'gap': '$2', '@md': {gap: 0}}} >
                                            <Col css={{d: 'flex'}}>
                                                <EditUser studentId={item.studentId}></EditUser>
                                            </Col>
                                            <Col css={{d: 'flex'}}>
                                                <Tooltip content="Delete user" color="error">
                                                    <IconButton onClick={() => {delBtn(item.studentId)}}>
                                                        <DeleteIcon size={20} fill="#FF0080" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Col>
                                        </Row>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                        </Table.Body>
                        <Table.Pagination shadow noMargin align="center" rowsPerPage={15} onPageChange={(page) => console.log({ page })} />
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}
