import CustomButton from '../atoms/CustomButton'
import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react'
import CustomCard from '../atoms/CustomCard'
import { useTeamMembers } from '../../hooks/useTeamMembers'

function CreateUser({setShowUserCreation}: any) {
  const { user, signup } = useAuth()
  const [show, setShow] = useState<boolean>(false)

  function handleCreate(e: any) {
    e.preventDefault()
    const target = e.target

    const email = target.email.value
    const password = target.password.value
    const role = target.role.value
    //To jest to poprawienia - po utworzeniu uzytkownika przelacza na nowo utworzonego uzytkownika
    signup(email, password, role, user.team)
    setShow(!show)
  }

  return (
    <CustomCard>
      <p>New user</p>
      <form onSubmit={handleCreate}>
        <input
          type='text'
          name='email'
          placeholder='Email'
          required
          className='rounded'
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          required
          className='rounded ml-4'
        />
        <select name='role' className='rounded'>
          <option value='Master'>Master of Content</option>
          <option value='Copywriter'>Copywriter</option>
        </select>
        <CustomButton className='ml-4'>Create</CustomButton>
        <CustomButton className='ml-4' customFunction={()=> setShowUserCreation(false)}>Cancel</CustomButton>
      </form>
    </CustomCard>
  )
}

export default CreateUser
