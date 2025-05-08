import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { AlertCircle, CheckCircle2, Download } from "lucide-react";
import { addStudent } from "@/api/students";

const BulkImportModal = ({ onImport, open, setOpen }) => {
  const [jsonInput, setJsonInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [preview, setPreview] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);

  const validateStudent = (student, index) => {
    const errors = [];

    if (!student.name?.trim()) {
      errors.push(`Student ${index + 1}: Name is required`);
    }

    if (!student.email?.trim()) {
      errors.push(`Student ${index + 1}: Email is required`);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)) {
      errors.push(`Student ${index + 1}: Invalid email format`);
    }

    if (!student.age) {
      errors.push(`Student ${index + 1}: Age is required`);
    } else if (isNaN(Number(student.age)) || Number(student.age) <= 0) {
      errors.push(`Student ${index + 1}: Age must be a positive number`);
    }

    if (!student.course?.trim()) {
      errors.push(`Student ${index + 1}: Course is required`);
    }

    if (!student.year) {
      errors.push(`Student ${index + 1}: Year is required`);
    } else if (isNaN(Number(student.year))) {
      errors.push(`Student ${index + 1}: Year must be a number`);
    }

    if (student.phone && !/^\d{10}$/.test(student.phone.trim())) {
      errors.push(`Student ${index + 1}: Phone number must be 10 digits`);
    }

    if (!student.enrollmentDate) {
      errors.push(`Student ${index + 1}: Enrollment Date is required`);
    }

    if (!student.status?.trim()) {
      errors.push(`Student ${index + 1}: Status is required`);
    } else if (!["Enrolled", "Pending", "Graduated", "Dropped"].includes(student.status)) {
      errors.push(`Student ${index + 1}: Invalid status. Must be one of: Enrolled, Pending, Graduated, Dropped`);
    }

    return errors;
  };

  const handleJsonInput = (e) => {
    const input = e.target.value;
    setJsonInput(input);
    setError("");
    setSuccess("");
    setPreview([]);
    setValidationErrors([]);

    if (!input.trim()) return;

    try {
      const students = JSON.parse(input);
      
      if (!Array.isArray(students)) {
        setError("Input must be an array of student objects");
        return;
      }

      // Validate the data
      const errors = [];
      students.forEach((student, index) => {
        const rowErrors = validateStudent(student, index);
        errors.push(...rowErrors);
      });

      if (errors.length > 0) {
        setValidationErrors(errors);
        setError("Please fix the validation errors before importing");
      } else {
        setPreview(students);
      }
    } catch (err) {
      setError("Invalid JSON format. Please check your input.");
    }
  };

  const handleImport = async () => {
    if (!jsonInput.trim() || preview.length === 0) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let successCount = 0;
      let failCount = 0;

      for (const student of preview) {
        try {
          await addStudent(student);
          successCount++;
        } catch (err) {
          console.error("Failed to add student:", err);
          failCount++;
        }
      }

      if (successCount > 0) {
        setSuccess(`Successfully imported ${successCount} students${failCount > 0 ? ` (${failCount} failed)` : ""}`);
        onImport();
        setOpen(false);
      } else {
        setError("Failed to import any students");
      }
    } catch (err) {
      setError("Error importing students");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadSample = () => {
    const sampleData = [
      {
        name: "John Doe",
        age: 20,
        email: "john.doe@example.com",
        course: "Computer Science",
        year: 2024,
        phone: "1234567890",
        enrollmentDate: "2024-01-15",
        status: "Enrolled"
      },
      {
        name: "Jane Smith",
        age: 21,
        email: "jane.smith@example.com",
        course: "Engineering",
        year: 2023,
        phone: "9876543210",
        enrollmentDate: "2023-08-20",
        status: "Pending"
      }
    ];

    const blob = new Blob([JSON.stringify(sampleData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sample_students.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          onClick={() => setOpen(true)}
        >
          Bulk Import
        </button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-2xl p-6">
        <DialogHeader>
          <DialogTitle>Bulk Import Students</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Paste JSON array of student objects
            </div>
            <button
              onClick={handleDownloadSample}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <Download className="size-4" />
              Download Sample
            </button>
          </div>

          <div className="border rounded-lg">
            <textarea
              value={jsonInput}
              onChange={handleJsonInput}
              placeholder="Paste your JSON array here..."
              className="w-full h-48 p-4 font-mono text-sm focus:outline-none resize-none"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded flex items-start gap-2">
              <AlertCircle className="size-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-600 p-3 rounded flex items-start gap-2">
              <CheckCircle2 className="size-5 shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          {validationErrors.length > 0 && (
            <div className="bg-yellow-50 text-yellow-600 p-3 rounded">
              <div className="flex items-start gap-2 mb-2">
                <AlertCircle className="size-5 shrink-0 mt-0.5" />
                <span className="font-medium">Validation Errors:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {preview.length > 0 && (
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-medium mb-2">Preview ({preview.length} students)</h3>
              <div className="max-h-60 overflow-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {preview.slice(0, 5).map((student, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2 text-sm text-gray-900">
                          {student.name}
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-900">
                          {student.email}
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-900">
                          {student.course}
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-900">
                          {student.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {preview.length > 5 && (
                  <p className="text-sm text-gray-500 mt-2">
                    Showing first 5 of {preview.length} students
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-4">
            <DialogClose asChild>
              <button
                type="button"
                className="bg-gray-300 px-4 py-2 rounded"
                disabled={loading}
              >
                Cancel
              </button>
            </DialogClose>
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
              onClick={handleImport}
              disabled={loading || preview.length === 0 || validationErrors.length > 0}
            >
              {loading ? "Importing..." : "Import Students"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BulkImportModal; 