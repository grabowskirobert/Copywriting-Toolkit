import {useEffect, useState} from 'react';
import styled from 'styled-components';
import { db } from '../../firebase/firebase';
import {addDoc, collection, doc, getDocs, updateDoc} from '@firebase/firestore';
import { useRouter } from 'next/router';
import CustomButton from '../atoms/CustomButton';
import CustomCard from '../atoms/CustomCard';
import {useAuth} from "../../contexts/AuthContext";

interface TaskProps {
	uid: string;
	task_title: string;
	date_start: string;
	date_end: string;
	keywords: Array<string>;
	content: string;
	team: string;
	status: string;
}

interface FormProps {
	taskForm: TaskProps;
	update?: boolean;
	setReload?: () => void;
	closeWindow?: () => void;
	taskCollection?: any;
	taskId?: string | string[] | undefined;
}

interface membersProps {
	user?: {
		email?: string,
		role?: string,
		tasks?: Array<string>,
		team?: string,
		uid?: string,
	},
	id?: string
}

const TaskForm = ({
	taskForm,
	update = false,
	setReload,
	closeWindow,
	taskCollection,
	taskId,
}: FormProps) => {
	const {user} = useAuth()
	const router = useRouter();
	const [members,setMembers] = useState<Array<membersProps>>([]);

	const [form, setForm] = useState({
		uid: taskForm.uid,
		task_title: taskForm.task_title,
		date_start: taskForm.date_start,
		date_end: taskForm.date_end,
		keywords: taskForm.keywords,
		content: taskForm.content,
		user: taskForm.team,
		status: update ? taskForm.status : 'active'
	});

	function handleChange(e: any) {
		const { value, name } = e.target;

		console.log(name,value);
		setForm((prevState: any) => ({
			...prevState,
			[name]: value,
		}));
	}

	const createTask = async (body: any) => {
		await addDoc(taskCollection, body);
		if(closeWindow !== undefined) {
			closeWindow();
		}
		if (setReload) {
			setReload();
		}
	};

	const updateTask = async (task_id: any, body: any) => {
		const taskDoc = doc(db, 'tasks', task_id);
		await updateDoc(taskDoc, body);
		router.back();
	};
	async function handleSubmit(e: any) {
		e.preventDefault();
		if (update) {
			console.log('update');
			await updateTask(taskId, form);
		} else if (!update) {
			console.log('create');
			await createTask(form);
		} else {
			console.error('Submit error');
		}
	}

	function teamMembers() {
		getDocs(collection(db, 'users')).then((snapshot) => {
			const usersUID = snapshot.docs.map((doc) => {
				return {user: doc.data(),id: doc.id}
			});
			return usersUID
		})
			.then(users => {
				return users.filter(member => {
					if(member.user.role !== 'Admin' && member.user.team === user.team) return member.user
				})
			})
			.then((member:({[p:string]:any})[]) => setMembers(member))

	};

	useEffect(()=>{
		teamMembers();
	},[])


	return (
		<>
			{update && (
				<CustomButton customFunction={() => router.back()}>
					Return
				</CustomButton>
			)}
			<Container>
				<CustomCard>
					<form onSubmit={handleSubmit}>
						<label htmlFor='task_title'>Task title</label>
						<input
							type='text'
							value={form.task_title}
							onChange={handleChange}
							required
							name='task_title'
						/>
						<label htmlFor='date_start'>Date start</label>
						<input
							type='date'
							value={form.date_start}
							onChange={handleChange}
							required
							name='date_start'
						/>
						<label htmlFor='date_end'>Date end</label>
						<input
							type='date'
							value={form.date_end}
							onChange={handleChange}
							required
							name='date_end'
						/>
						<label htmlFor='keywords'>Keywords</label>
						<input
							type='text'
							value={form.keywords}
							onChange={handleChange}
							required
							name='keywords'
						/>
						<label htmlFor='user'>Assing to</label>
						<select onChange={handleChange} name='user' value={form.user}>
							<option value=''>Select user</option>
							{
								members?.map((el,index) => {
									return <option key={index} value={el?.user?.uid} >{el?.user?.email}</option>
								})
							}
						</select>

						<input
							type='submit'
							value={update ? 'Update' : 'Create'}
						/>
						{!update && (
							<CustomButton customFunction={() => {
								if(closeWindow !== undefined) {
									closeWindow();
								}
							}
							}>
								Close
							</CustomButton>
						)}
					</form>
				</CustomCard>
			</Container>
		</>
	);
};
const Container = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 2em;
	width: min(calc(100%), 600px);
	form {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
`;

export default TaskForm;
