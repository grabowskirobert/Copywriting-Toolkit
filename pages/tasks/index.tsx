import CustomButton from '../../components/atoms/CustomButton';
import Task from '../../components/organisms/Task';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import TaskForm from '../../components/organisms/TaskForm';
import { collection, getDocs, doc, deleteDoc } from '@firebase/firestore';
import privateRoute from '../../layouts/PrivateRoute';
import { useAuth } from '../../contexts/AuthContext';
// import { StyledInput } from '../../styles/Shared';
import Layout from '../../layouts/Layout';

const Index = () => {
	const [addTask, setAddTask] = useState<boolean>(false);
	const [reload, setReload] = useState<boolean>(false);
	const [query, setQuery] = useState<string>('');
		const [statusFilter, setStatusFilter] = useState<string>('');
	const [task, setTask] = useState<Array<any>>([]);
	const { user } = useAuth();

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

	const taskForm:TaskProps = {
		uid: user?.uid,
		task_title: '',
		date_start: '',
		date_end: '',
		keywords: [],
		content: '',
		team: '',
		status: ''
	};

	const taskCollection = collection(db, 'tasks');

	const deleteTask = async (id: any) => {
		const taskDoc = doc(db, 'tasks', id);
		await deleteDoc(taskDoc);
		setReload(!reload);
		console.log('deleted');
	};

	useEffect(() => {
		const getTask = async () => {
			const data = await getDocs(taskCollection);
			setTask(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getTask();

		return () => {
			setTask([]);
		};
	}, [reload]);

	return (
		<Layout>
			<div>
				<div>
					<div className='flex flex-col w-1/4'>
						<select className='rounded' onChange={(e) => setStatusFilter(e.target.value)}>
							<option value=''>Show all</option>
							<option value='unfinished'>Finished</option>
							<option value='active'>Active</option>
							<option value='inactive'>Inactive</option>
						</select>
						{/*<CustomButton>Resetuj wybór filtru</CustomButton>*/}
					</div>
				</div>
				<div className='flex justify-center '>
					<div className='w-4/5 mt-8 shadow-lg rounded'>
						<div className='flex justify-between py-1 border-b-2'>
							<input
								className='w-3/5 mr-auto rounded'
								type='text'
								placeholder='Search for a task'
								onChange={(e) =>
									setQuery(e.currentTarget.value)
								}
							/>
							<CustomButton
								customFunction={() => {
									setAddTask(!addTask);
								}}
							>
								Add task
							</CustomButton>
						</div>
						{task
							.filter((taskUser: any) =>
								taskUser.uid?.includes(user?.uid)
							)
							.filter((taskUser: any) =>
								statusFilter === "" ? (taskUser.status.includes(statusFilter) ) : (taskUser.status === statusFilter)
							)
							.filter((el: any) =>
								el.task_title
									.toLocaleLowerCase()
									.includes(query.toLocaleLowerCase())
							)
							.map((el) => (
								<Task
									{...el}
									key={el.id}
									deleteTask={() => deleteTask(el.id)}
								/>
							))}
					</div>
				</div>
				{addTask && (
					<TaskForm
						taskCollection={taskCollection}
						setReload={() => setReload(!reload)}
						taskForm={taskForm}
						closeWindow={() => {
							setAddTask(!addTask);
						}}
					/>
				)}
			</div>
		</Layout>
	);
};

export default privateRoute(Index);
