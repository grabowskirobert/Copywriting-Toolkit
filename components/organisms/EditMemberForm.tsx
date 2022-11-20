import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import React from 'react'
import Button from '../atoms/Button'
import Card from '../atoms/Card'
import FormCell from '../atoms/FormCell'
import FormContainer from '../atoms/FormContainer'
import { doc, updateDoc, getDoc } from '@firebase/firestore'
import { db } from '../../firebase/firebase'

interface EditMemberFormProps {
  member:
    | {
        email?: string | undefined
        role?: string | undefined
        tasks?: string[] | undefined
        uid?: string | undefined
      }
    | undefined
  userDocID: string
}

const EditMemberForm = ({ member, userDocID }: EditMemberFormProps) => {
  const router = useRouter()
  const [memberData, setMemberData] = useState<EditMemberFormProps['member']>({
    email: '',
    role: '',
    tasks: [],
    uid: '',
  })

  useEffect(() => {
    if (member !== undefined) {
      const fetchUser = async (userDocID: string) => {
        const userDoc = doc(db, 'users', userDocID)
        const data = await getDoc(userDoc)
        const userData = data.data()
        setMemberData(userData)
      }
      fetchUser(userDocID)
    }
  }, [userDocID])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setMemberData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const updateMember = async (userDocID: string, memberData: any) => {
    const usersDoc = doc(db, 'users', userDocID)
    await updateDoc(usersDoc, memberData)
    router.back()
  }

  async function handleSubmit(e: any) {
    e.preventDefault()
    await updateMember(userDocID, memberData)
  }

  return (
    <FormContainer className='w-1/3'>
      <Card className='relative'>
        <h2 className='text-center mb-4 text-xl'>Edit {member?.email}</h2>
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
  )
}

export default EditMemberForm
