import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const login = async (email, password) => {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			setUser(userCredential.user);
			return userCredential.user;
		} catch (error) {
			throw error;
		}
	};

	const register = async (email, password) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			setUser(userCredential.user);
			return userCredential.user;
		} catch (error) {
			throw error;
		}
	};

	const logout = async () => {
		try {
			await auth.signOut();
			setUser(null);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<AuthContext.Provider value={{ user, loading, login, register, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
