import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../../layouts/Layout'
import privateRoute from '../../../layouts/PrivateRoute'
import { db } from '../../../firebase/firebase'
import FormContainer from '../../../components/atoms/FormContainer'
import FormCell from '../../../components/atoms/FormCell'
import Card from '../../../components/atoms/Card'
import Button from '../../../components/atoms/Button'
import { useTeamMembers } from '../../../hooks/useTeamMembers'
import { doc, updateDoc } from '@firebase/firestore'

interface EditMemberFormProps {
    member:
        | {
              email?: string | undefined
              role?: string | undefined
              tasks?: string[] | undefined
              uid?: string | undefined
          }
        | undefined
}

const EditMember = () => {
    const router = useRouter()
    const { id } = router.query
    const { allMembers } = useTeamMembers()
    const member = allMembers.filter((member) => member.id === id)[0]?.user
    const [memberData, setMemberData] = useState<EditMemberFormProps['member']>(
        {
            email: '',
            role: '',
            tasks: [],
            uid: '',
        }
    )

    useEffect(() => {
        setMemberData(member)
    }, [id])

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setMemberData((prevState: any) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const updateMember = async (id: any, memberData: any) => {
        const usersDoc = doc(db, 'users', id)
        await updateDoc(usersDoc, memberData)
        router.back()
    }

    async function handleSubmit(e: any) {
        e.preventDefault()
        await updateMember(id, memberData)
    }

    return (
        <Layout>
            <FormContainer className='w-1/3'>
                <Card className='relative'>
                    <h2 className='text-center mb-4 text-xl'>
                        Edit {member?.email}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <FormCell id='role'>
                            <label htmlFor='role'>Role</label>
                            <div className='flex flex-col w-full'>
                                <select
                                    className='rounded'
                                    id='role'
                                    name='role'
                                    onChange={handleChange}
                                >
                                    <option
                                        value='Copywriter'
                                        selected={member?.role === 'Copywriter'}
                                    >
                                        Copywriter
                                    </option>
                                    <option
                                        value='Master'
                                        selected={member?.role === 'Master'}
                                    >
                                        Master
                                    </option>
                                </select>
                            </div>
                        </FormCell>
                        <Button
                            type='submit'
                            className='w-1/4'
                        >
                            Save
                        </Button>
                    </form>
                    <Button
                        className='absolute w-1/4 bottom-5 right-8'
                        onClick={() => router.back()}
                    >
                        Cancel
                    </Button>
                </Card>
            </FormContainer>
        </Layout>
    )
}

export default privateRoute(EditMember)
