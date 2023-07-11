export async function editIsPressed(studentId: number) {
    console.log(studentId)
}

export async function deleteIsPressed(studentId: number) {
    const res = await fetch(`/api/user/delete?sid=${studentId}`, {
        method: "DELETE",
    })

    return await res.status
}

