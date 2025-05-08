import React, { useState } from "react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogClose,
} from "@/components/ui/dialog";
import { Plus, AlertCircle, CheckCircle2 } from "lucide-react";
import { addStudent } from "@/api/students";

const AddStudentModal = ({ onAdd, open, setOpen }) => {
	const [form, setForm] = useState({
		name: "",
		age: "",
		email: "",
		course: "",
		year: "",
		phone: "",
		address: "",
		enrollmentDate: "",
		status: "",
	});

	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const validate = () => {
		const errs = {};
		const currentDate = new Date();
		const currentYear = new Date().getFullYear();

		if (!form.name.trim()) {
			errs.name = "Name is required";
		}

		if (!form.email.trim()) {
			errs.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
			errs.email = "Enter a valid email address";
		}

		if (!form.age) {
			errs.age = "Age is required";
		} else if (isNaN(Number(form.age)) || Number(form.age) <= 0) {
			errs.age = "Enter a valid age";
		}

		if (!form.course.trim()) {
			errs.course = "Course is required";
		}

		if (!form.year) {
			errs.year = "Year is required";
		} else if (isNaN(Number(form.year))) {
			errs.year = "Year must be a number";
		}

		if (form.phone && !/^\d{10}$/.test(form.phone.trim())) {
			errs.phone = "Phone number must be 10 digits";
		}

		if (!form.enrollmentDate) {
			errs.enrollmentDate = "Enrollment Date is required";
		}

		if (!form.status.trim()) {
			errs.status = "Status is required";
		}

		return errs;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const validationErrors = validate();
		setErrors(validationErrors);
		if (Object.keys(validationErrors).length > 0) return;

		setLoading(true);
		try {
			const added = await addStudent({ ...form });
			if (added) {
				setSuccess(true);
				setTimeout(() => {
					onAdd(added);
					setOpen(false);
					// Reset form after successful addition
					setForm({
						name: "",
						age: "",
						email: "",
						course: "",
						year: "",
						phone: "",
						address: "",
						enrollmentDate: "",
						status: "",
					});
				}, 1000);
			}
		} catch (err) {
			console.error("Add student failed", err);
			setErrors({ submit: "Failed to add student. Please try again." });
		} finally {
			setLoading(false);
		}
	};

	const formFields = [
		{
			name: "name",
			label: "Full Name",
			type: "text",
			required: true,
		},
		{
			name: "age",
			label: "Age",
			type: "number",
			required: true,
		},
		{
			name: "email",
			label: "Email",
			type: "email",
			required: true,
		},
		{
			name: "course",
			label: "Course",
			type: "text",
			required: true,
		},
		{
			name: "year",
			label: "Year",
			type: "number",
			required: true,
		},
		{
			name: "phone",
			label: "Phone Number",
			type: "tel",
			required: false,
			placeholder: "Optional",
		},
		{
			name: "address",
			label: "Address",
			type: "text",
			required: false,
			placeholder: "Optional",
		},
		{
			name: "enrollmentDate",
			label: "Enrollment Date",
			type: "date",
			required: true,
		},
		{
			name: "status",
			label: "Status",
			type: "select",
			required: true,
			options: [
				{ value: "", label: "Select Status" },
				{ value: "Enrolled", label: "Enrolled" },
				{ value: "Pending", label: "Pending" },
				{ value: "Graduated", label: "Graduated" },
				{ value: "Dropped", label: "Dropped" },
			],
		},
	];

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button
					className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors w-full sm:w-auto"
					onClick={() => setOpen(true)}
				>
					<Plus className="size-5" />
					Add Student
				</button>
			</DialogTrigger>

			<DialogContent className="w-[95vw] max-w-md p-4 sm:p-6">
				<DialogHeader>
					<DialogTitle className="text-xl font-semibold">Add New Student</DialogTitle>
				</DialogHeader>

				{success ? (
					<div className="flex flex-col items-center justify-center py-8">
						<CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
						<p className="text-lg font-medium text-gray-900">Student added successfully!</p>
					</div>
				) : (
					<form onSubmit={handleSubmit} className="space-y-4 mt-4">
						{errors.submit && (
							<div className="bg-red-50 text-red-600 p-3 rounded flex items-start gap-2">
								<AlertCircle className="size-5 shrink-0 mt-0.5" />
								<span>{errors.submit}</span>
							</div>
						)}

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{formFields.map(({ name, label, type, required, placeholder, options }) => (
								<div key={name} className={`space-y-1 ${name === "address" ? "sm:col-span-2" : ""}`}>
									<label className="block text-sm font-medium text-gray-700">
										{label}
										{required && <span className="text-red-500 ml-1">*</span>}
									</label>
									{type === "select" ? (
										<select
											name={name}
											value={form[name]}
											onChange={handleChange}
											className={`w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
												errors[name] ? "border-red-500" : "border-gray-300"
											}`}
										>
											{options.map(({ value, label }) => (
												<option key={value} value={value}>
													{label}
												</option>
											))}
										</select>
									) : (
										<input
											name={name}
											value={form[name]}
											onChange={handleChange}
											type={type}
											placeholder={placeholder}
											className={`w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
												errors[name] ? "border-red-500" : "border-gray-300"
											}`}
										/>
									)}
									{errors[name] && (
										<p className="text-red-500 text-sm flex items-center gap-1">
											<AlertCircle className="size-4" />
											{errors[name]}
										</p>
									)}
								</div>
							))}
						</div>

						<div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
							<DialogClose asChild>
								<button
									type="button"
									className="w-full sm:w-auto px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
									disabled={loading}
								>
									Cancel
								</button>
							</DialogClose>
							<button
								type="submit"
								className="w-full sm:w-auto px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
								disabled={loading}
							>
								{loading ? "Adding..." : "Add Student"}
							</button>
						</div>
					</form>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default AddStudentModal;
