import { Flex } from '@/components/styles/flex'
import getDataByCookie from '@/libs/getDataByCookie';
import { studentData } from '@/type';
import { Button, Card, Container, Input, Loading, Spacer, Text } from '@nextui-org/react';
import React, { ChangeEvent, useEffect, useState } from 'react'
import Swal from 'sweetalert2';

export default function Setting() {
  const [isClicked, setIsClicked] = useState<boolean>(false);
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
  
  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((prev) => ({...prev, [name]: value}))
    console.log( name, value )
  }

  async function getUserById() {
    setData(await getDataByCookie())
  }

  useEffect(() => {
    getUserById()
  }, [])

  async function submitHandler() {
    setIsClicked(true)
    Swal.fire({
      title: 'แน่ใจหรอ',
      icon: 'warning',
      showCancelButton: true ,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then(async (result) => {
      if (result.isConfirmed) {

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
                isUserUpdate: "true",
                updateUser: data.studentId
            })
        })

          const Toast = Swal.mixin({
              toast: true,
              position: 'top-right',
              customClass: {
                popup: 'colored-toast'
              },
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true
          })
          
          if (await res.text() !== "Success") {
            setIsClicked(false)
            return await Toast.fire({ icon: 'error', title: 'Faild!'})
          }
          setIsClicked(false)
          await Toast.fire({ icon: 'success', title: 'Done!' })

          return setTimeout(() => window.location.reload(), 1500)
      }
      setIsClicked(false)
    })
  }

  return (
    <>
      <Container css={{'p': '$12'}} fluid>
        <Card>
          <Card.Header>
            <Text css={{'ml': '$1'}} span color='dark' size={'$2xl'}>
              📝 ข้อมูลทั่วไป
            </Text>
          </Card.Header>
          <Card.Body css={{gap: '$5'}}>
            <Flex justify={'center'} css={{'@sm': {gap: '$10'}}} direction={'row'}>
              <Input value={data.name} fullWidth readOnly name='name' label='ชื่อ'/>
              <Input value={data.surname} fullWidth readOnly name='surname' label='นามสกุล'/>
              <Input value={data.studentId} fullWidth readOnly name='studentId' label='เลขประจำตัว'/>
            </Flex>
            <Spacer y={1}/>
            <Flex justify={'center'} css={{'@sm': {gap: '$10'}}} direction={'row'}>
              <Input value={data.yearClass} fullWidth readOnly name='yearClass' label='ชั้นปี'/>
              <Input value={data.Class} fullWidth readOnly name='Class' label='ห้อง'/>
            </Flex>
          </Card.Body>
        </Card>
        <Spacer y={2}/>
        <Card>
          <Card.Header>
            <Text css={{'ml': '$1'}} span color='dark' size={'$2xl'}>
              📝 ข้อมูลล็อคอิน
            </Text>
          </Card.Header>
          <Card.Body css={{gap: '$5'}}>
            <Flex justify={'center'} css={{'@sm': {gap: '$10'}}} direction={'row'}>
              <Input onInput={inputHandler} value={data.username} fullWidth name='username' label='ชื่อผู้ใช้'/>
              <Input.Password onInput={inputHandler} value={data.password} fullWidth name='password' label='รหัสผ่าน'/>
            </Flex>
            <Spacer y={1}/>
            <Flex justify={'center'} css={{'@sm': {gap: '$10'}}} direction={'row'}>
              <Input onInput={inputHandler} value={data.image} fullWidth name='image' label='โปรไฟล์ *เป็นลิ้งค์เท่านั้น*'/>
            </Flex>
            <Spacer y={1}/>
            <Flex justify={'start'} css={{'@sm': {gap: '$10'}}} direction={'row'}>
              {
                isClicked === true ? 
                <Button disabled><Loading color='default' size='md' /></Button> :
                <Button onPress={submitHandler}>บันทึก</Button>
              }
              
            </Flex>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}
