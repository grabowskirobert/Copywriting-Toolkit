import React, { useState, useRef } from 'react';
import CustomCard from '../components/atoms/CustomCard';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import CustomButton from '../components/atoms/CustomButton';
import { CenterScreen } from '../components/atoms/CenterScreen';
import { FormContainer } from '../components/atoms/FormContainer';
import { ErrorMessage } from '../components/atoms/ErrorMessage';
import { FormCell } from '../components/atoms/FormCell';
import { StyledInput } from '../components/atoms/StyledInput';

function SignUp() {
	const emailRef: React.MutableRefObject<any> = useRef();
	const passwordRef: React.MutableRefObject<any> = useRef();
	const passwordConfirmRef: React.MutableRefObject<any> = useRef();
	const { signup } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	async function handleSubmit(data: any): Promise<void> {
		data.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('Password do not match');
		}

		try {
			setError('');
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			router.push('/');
		} catch (e) {
			setError('Failed to create an account');
			console.log(e);
		}
		setLoading(false);
	}

	return (
		<CenterScreen>
			<FormContainer>
				<CustomCard>
					<h2 className='text-center mb-4 text-lg'>Sign up</h2>
					<ErrorMessage>{error && error}</ErrorMessage>
					<form onSubmit={handleSubmit}>
						<FormCell id='email'>
							<label htmlFor=''>Email</label>
							<StyledInput type='email' ref={emailRef} required />
						</FormCell>
						<FormCell id='password'>
							<label htmlFor=''>Password</label>
							<StyledInput
								type='password'
								ref={passwordRef}
								required
							/>
						</FormCell>
						<FormCell id='password-confirm'>
							<label htmlFor=''>Password Confirmation</label>
							<StyledInput
								type='password'
								ref={passwordConfirmRef}
								required
							/>
						</FormCell>
						<CustomButton type='submit' disabled={loading}>
							Sign Up
						</CustomButton>
					</form>
				</CustomCard>
				<div className='w-full text-center mt-2'>
					Already have an account?
					<Link href='/login'>
						<a className='font-semibold ml-1'>Log In</a>
					</Link>
				</div>
			</FormContainer>
		</CenterScreen>
	);
}

export default SignUp;
