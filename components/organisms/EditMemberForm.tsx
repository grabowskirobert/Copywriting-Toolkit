import { useState } from 'react'
import { useRouter } from 'next/router'
import React from 'react'
import Button from '../atoms/Button'
import Card from '../atoms/Card'
import FormCell from '../atoms/FormCell'
import FormContainer from '../atoms/FormContainer'
import { doc, updateDoc } from '@firebase/firestore'
import { db } from '../../firebase/firebase'

interface EditMemberFormProps {
  member:
    | {
        email?: string | undefined
        role?: string | undefined
        tasks?: string[] | undefined
        team?: string | undefined
        uid?: string | undefined
      }
    | undefined
  id: string | string[] | undefined
}

const EditMemberForm = ({ member, id }: EditMemberFormProps) => {
  const router = useRouter()
  const [memberData, setMemberData] = useState({})

  const handleChange = (e: any) => {
    const { value, role } = e.target
    setMemberData((prevState: any) => ({
      ...prevState,
      [role]: value,
    }))
  }

  const updateMember = async (id: any, body: any) => {
    const usersDoc = doc(db, 'users', id)
    await updateDoc(usersDoc, body)
    router.back()
  }

  async function handleSubmit(e: any) {
    e.preventDefault()
    await updateMember(id, memberData)
  }

  return (
    <FormContainer className='w-1/3'>
      <Card className='relative'>
        <h2 className='text-center mb-4 text-xl'>Edit {member?.email}</h2>
        <form onSubmit={handleSubmit}>
          <FormCell id='role'>
            <label htmlFor=''>Role</label>
            <div className='flex flex-col w-full '>
              <select className='rounded'>
                <option
                  value='Copywriter'
                  selected={member?.role === 'Copywriter'}
                  onChange={handleChange}
                >
                  Copywriter
                </option>
                <option
                  value='Master'
                  selected={member?.role === 'Master'}
                  onChange={handleChange}
                >
                  Master of content
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
