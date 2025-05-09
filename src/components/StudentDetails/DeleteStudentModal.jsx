import React, { useState } from "react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogClose,
	DialogDescription,
} from "@/components/ui/dialog";
import { Trash2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { deleteStudent } from "@/api/students";
import { useNavigate } from "react-router-dom";

const DeleteStudentModal = ({ student, onDelete, open, setOpen }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const navigate = useNavigate();

	const handleDelete = async () => {
		setLoading(true);
		setError("");
		try {
			const deleted = await deleteStudent(student.id);
			if (deleted) {
				setOpen(false);
				onDelete(student.id);
				navigate("/dashboard");
			}
		} catch (err) {
			console.error("Delete student failed", err);
			setError("Failed to delete student. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<div
					className="text-red-500 bg-gray-100 p-1.5 rounded hover:bg-gray-200 transition-colors"
					onClick={() => setOpen(true)}
				>
					<Trash2 className="cursor-pointer size-4" />
				</div>
			</DialogTrigger>

			<DialogContent className="w-[95vw] max-w-md p-4" aria-describedby="delete-student-description">
				<DialogHeader>
					<DialogTitle className="text-lg font-medium">Delete Student</DialogTitle>
				</DialogHeader>
				<DialogDescription id="delete-student-description" className="sr-only">
					Are you sure you want to delete this student? This action cannot be undone.
				</DialogDescription>

				{success ? (
					<div className="flex flex-col items-center justify-center py-6">
						<CheckCircle2 className="w-10 h-10 text-green-500 mb-3" />
						<p className="text-base font-medium text-gray-900">Student deleted successfully!</p>
					</div>
				) : (
					<div className="space-y-3 mt-3">
						{error && (
							<div className="bg-red-50 text-red-600 p-2 rounded flex items-start gap-2 text-sm">
								<AlertTriangle className="size-4 shrink-0 mt-0.5" />
								<span>{error}</span>
							</div>
						)}

						<div className="bg-yellow-50 p-3 rounded">
							<div className="flex items-start gap-2">
								<AlertTriangle className="size-4 text-yellow-600 shrink-0 mt-0.5" />
								<div>
									<h3 className="font-medium text-yellow-800 text-sm">Are you sure you want to delete this student?</h3>
									<p className="mt-1 text-xs text-yellow-700">
										This action cannot be undone. All data associated with {student.name} will be permanently removed.
									</p>
								</div>
							</div>
						</div>

						<div className="bg-gray-50 p-3 rounded">
							<h4 className="font-medium text-gray-900 text-sm mb-2">Student Details</h4>
							<dl className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
								<dt className="text-gray-500">Name:</dt>
								<dd className="font-medium">{student.name}</dd>
								<dt className="text-gray-500">Email:</dt>
								<dd className="font-medium">{student.email}</dd>
								<dt className="text-gray-500">Course:</dt>
								<dd className="font-medium">{student.course}</dd>
								<dt className="text-gray-500">Status:</dt>
								<dd className="font-medium">{student.status}</dd>
							</dl>
						</div>

						<div className="flex flex-col sm:flex-row justify-end gap-2 pt-3">
							<DialogClose asChild>
								<button
									type="button"
									className="w-full sm:w-auto px-3 py-1.5 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
									disabled={loading}
								>
									Cancel
								</button>
							</DialogClose>
							<button
								type="button"
								onClick={handleDelete}
								className="w-full sm:w-auto px-3 py-1.5 text-sm text-white bg-red-600 rounded hover:bg-red-700 transition-colors disabled:opacity-50"
								disabled={loading}
							>
								{loading ? "Deleting..." : "Delete Student"}
							</button>
						</div>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default DeleteStudentModal;
