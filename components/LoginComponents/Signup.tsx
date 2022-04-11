import React, { useState } from 'react'
import CustomCard from '../CustomCard'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import FormItem from "./FormItem"
import FormButton from './FormButton'

interface Inputs {
  example: string
  exampleRequired: string
}

function Signup() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm()

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  const [showError, setShowError] = useState(false)
  const [status200, setStatus200] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  // async function onSubmit(data: Response): Promise<void> {
  //   setShowError(false)
  //   setIsLoading(true)
  //   try {
  //     const response = await axios.post(
  //       `${config.BASE_API}${config.apiRoutes.SEND_EMAIL}`,
  //       data
  //     )
  //     if (response.status === 200) {
  //       setStatus200(true)
  //       setTimeout(StatusDelay, 10000)
  //     }
  //   } catch (err) {
  //     setShowError(true)
  //     console.log(err)
  //   }

  //   setIsLoading(false)
  //   reset()
  // }

  return (
    <>
      <CustomCard>
        <h2 className='text-center mb-4'>Sign up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <FormItem
                  error={errors.email}
                  register={register}
                  options={{
                    required: { value: true, message: 'Complete this field' },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Incorrect email address',
                    },
                  }}
                  type='email'
                  placeholder='Email*'
                  name='email'
                  errorMessage={errors?.name?.message}
                  // disabled={isLoading}
                />
        <FormItem
                  error={errors.password}
                  register={register}
                  options={{
                    required: { value: true, message: 'Complete this field' },
                  }}
                  type='password'
                  placeholder='Password*'
                  name='password'
                  errorMessage={errors?.name?.message}
                  // disabled={isLoading}
                />
        <FormItem
                  error={errors.passwordConfirmation}
                  register={register}
                  options={{
                    required: { value: true, message: 'Complete this field' },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Incorrect email address',
                    },
                  }}
                  type='password'
                  placeholder='Password Confirmation*'
                  name='passwordConfirmation'
                  errorMessage={errors?.name?.message}
                  // disabled={isLoading}
                />
                <FormButton 
                status200={status200}
                error={showError}
                // disabled={isLoading}
                />
          {/* <div>
            <label htmlFor=''>Email</label>
            <input type='email' ref={emailRef} required />
          </div>
          <div>
            <label htmlFor=''>Password</label>
            <input type='password' ref={passwordRef} required />
          </div>
          <div>
            <label htmlFor=''>Password Confirmation</label>
            <input type='email' ref={emailRef} required />
          </div> */}
        </form>
      </CustomCard>
      <div className='w-full text-center mt-2'>
        Already have an account?
        <Link href='/login'>
          <a>Login</a>
        </Link>
      </div>
    </>
  )
}

export default Signup
