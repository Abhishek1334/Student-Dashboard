// src/api/students.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchStudents = async () => {
	try {
		const res = await axios.get(`${API_URL}/students`);
		return res.data;
	} catch (err) {
		console.error(err);
		return [];
	}
};

export const addStudent = async (student) => {
	try {
		const res = await axios.post(`${API_URL}/students`, student);
		return res.data;
	} catch (err) {
		console.error(err);
		return null;
	}
};

export const getStudentDetails = async (id) => {
	try {
		const res = await axios.get(`${API_URL}/students/${id}`);
		return res.data;
	} catch (err) {
		console.error("Error fetching student details:", err);
		throw err;
	}
};

export const deleteStudent = async(id) => {
	try {
		const res = await axios.delete(`${API_URL}/students/${id}`);
		return res.data;
	} catch (err) {
		console.error("Error deleting student:", err);
		throw err;
	}
}

export const updateStudent = async(id, student) => {
	try {
		const res = await axios.put(`${API_URL}/students/${id}`, student);
		return res.data;
	} catch (err) {
		console.error("Error updating student:", err);
		throw err;
	}
}
