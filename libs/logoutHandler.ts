import { cookies } from 'next/headers'

export default async function logout() {

    cookies().set({
        name: 'user-token',
        value: '',
        expires: 0,
        path: '/', // For all paths
      })

    return 'success'

 }