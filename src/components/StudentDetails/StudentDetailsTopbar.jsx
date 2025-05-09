import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import DeleteStudentModal from './DeleteStudentModal';
import EditStudentModal from './EditStudentModal';
const StudentDetailsTopbar = ({ student, setStudent }) => {
	const [open, setOpen] = useState(false);
	const [editing, setEditing] = useState(false);
	const navigate = useNavigate()

	const handleDelete = (deletedId) => {
		// Optionally clear student state or show a message
		setStudent(null);
		navigate("/dashboard");
	};

	return (
		<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
			<button
				onClick={() => navigate("/dashboard")}
				className="flex items-center gap-1 text-white bg-blue-400 w-fit px-4 py-1 rounded-full "
			>
				<ArrowLeft size={19} />
			</button>
			<div className="flex gap-3 max-md:justify-end">
				<EditStudentModal student={student} onUpdate={setStudent} open={editing} setOpen={setEditing}/>
				<DeleteStudentModal student={student} open={open} setOpen={setOpen} onDelete={handleDelete} />
			</div>
		</div>
	);
}

export default StudentDetailsTopbar