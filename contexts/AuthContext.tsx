import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	updateEmail,
	updatePassword,
	User,
	UserCredential,
} from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { auth, db } from '../firebase/firebase';
import { collection, addDoc, getDocs } from '@firebase/firestore';

interface ValueProps {
	login: (email: string, password: string) => Promise<UserCredential>;
	signup: (email: string, password: string) => void;
	user: () => void;
	logout: () => Promise<void>;
	resetPassword: (email: string) => Promise<void>;
	updateEmailAuth: (email: string) => Promise<void>;
	updatePasswordAuth: (password: string) => Promise<void>;
	userID: string | undefined;
}

const AuthContext = React.createContext<ValueProps | null>(null);
const users = collection(db, 'users');

export function useAuth(): any {
	return useContext(AuthContext);
}

export function AuthProvider({ children }: JSX.ElementChildrenAttribute) {
	const [currentUser, setCurrentUser] = useState<User | null>();
	const [user, setUser] = useState<any>();
	const [userID, setUserID] = useState<string | undefined>('');
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	useEffect(() => {
		const getUser = () => {
			getDocs(collection(db, 'users')).then((snapshot) => {
				const usersUID = snapshot.docs.map((doc) => {
					return {user: doc.data(),id: doc.id}
				});
				if (currentUser) {
					const userInfo = usersUID.find(
						(element) => element.user.uid === currentUser.uid
					);
					setUser(userInfo?.user);
					setUserID(userInfo?.id);
				}
			});
		};
		return getUser();
	}, [currentUser]);

	function signup(email: string, password: string, role: string = 'Admin',team: string = '') {
		createUserWithEmailAndPassword(auth, email, password).then((newUser) =>
			addDoc(users, {
				email,
				uid: newUser.user.uid,
				role: role,
				team: team,
				tasks: []
			})
		);
	}

	function login(email: string, password: string) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	function logout() {
		return signOut(auth);
	}

	function resetPassword(email: string) {
		return sendPasswordResetEmail(auth, email);
	}

	function updateEmailAuth(email: string) {
		return updateEmail(auth.currentUser!, email);
	}

	function updatePasswordAuth(password: string) {
		return updatePassword(auth.currentUser!, password);
	}

	const value: ValueProps = {
		login,
		signup,
		user,
		userID,
		logout,
		resetPassword,
		updateEmailAuth,
		updatePasswordAuth,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
