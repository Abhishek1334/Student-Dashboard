import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { AlertCircle, CheckCircle2, Download, Upload, Info } from "lucide-react";
import { addStudent } from "@/api/students";
import { useAuth } from "@/hooks/useAuth";

const BulkImportModal = ({ onImport, open, setOpen }) => {
  const [jsonInput, setJsonInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [preview, setPreview] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const { user } = useAuth();

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
      const userId = user?.uid || user?.id;

      for (const student of preview) {
        try {
          await addStudent({ ...student, userId });
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
        year: 2,
        phone: "1234567890",
        enrollmentDate: "2024-01-15",
        status: "Enrolled"
      },
      {
        name: "Jane Smith",
        age: 21,
        email: "jane.smith@example.com",
        course: "Engineering",
        year: 3,
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
          <Upload className="size-4" />
          Bulk Import
        </button>
      </DialogTrigger>

      <DialogContent
        className="w-full max-w-4xl p-2 sm:p-4 md:p-6 rounded-lg shadow-lg"
        style={{ maxHeight: '90vh', overflow: 'hidden' }}
      >
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-semibold">Bulk Import Students</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 mt-2 sm:mt-4 overflow-y-auto" style={{ maxHeight: '70vh' }}>
          {/* Instructions */}
          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
            <div className="flex items-start gap-2 sm:gap-3">
              <Info className="size-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-1 sm:space-y-2">
                <h3 className="font-medium text-blue-900 text-sm sm:text-base">How to Import Students</h3>
                <ul className="list-disc list-inside text-xs sm:text-sm text-blue-800 space-y-1">
                  <li>Prepare your student data in JSON array format</li>
                  <li>Each student must have: name, email, age, course, year, status, and enrollmentDate</li>
                  <li>Optional fields: phone and address</li>
                  <li>Click "Download Sample" to see the required format</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="space-y-1 sm:space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <label className="text-xs sm:text-sm font-medium text-gray-700">Student Data (JSON)</label>
              <button
                onClick={handleDownloadSample}
                className="flex items-center gap-2 text-xs sm:text-sm text-blue-600 hover:text-blue-700"
              >
                <Download className="size-4" />
                Download Sample
              </button>
            </div>
            <div className="border rounded-lg bg-gray-50">
              <textarea
                value={jsonInput}
                onChange={handleJsonInput}
                placeholder="Paste your JSON array here..."
                className="w-full h-40 sm:h-64 p-2 sm:p-4 font-mono text-xs sm:text-sm focus:outline-none resize-none bg-transparent"
                style={{ minHeight: '120px', maxHeight: '200px' }}
              />
            </div>
          </div>

          {/* Status Messages */}
          {error && (
            <div className="bg-red-50 text-red-600 p-3 sm:p-4 rounded-lg flex items-start gap-2 sm:gap-3 text-xs sm:text-sm">
              <AlertCircle className="size-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-600 p-3 sm:p-4 rounded-lg flex items-start gap-2 sm:gap-3 text-xs sm:text-sm">
              <CheckCircle2 className="size-5 shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg">
              <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                <AlertCircle className="size-5 text-yellow-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-yellow-900 text-xs sm:text-base">Validation Errors</h3>
                  <p className="text-xs sm:text-sm text-yellow-800">Please fix the following issues before importing:</p>
                </div>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-yellow-800 max-h-32 overflow-y-auto pr-2">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Preview */}
          {preview.length > 0 && (
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2 sm:mb-3 text-xs sm:text-base">Preview ({preview.length} students)</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-2 sm:px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-2 sm:px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-2 sm:px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Course</th>
                      <th className="px-2 sm:px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {preview.slice(0, 5).map((student, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-2 sm:px-4 py-2 text-gray-900">{student.name}</td>
                        <td className="px-2 sm:px-4 py-2 text-gray-900">{student.email}</td>
                        <td className="px-2 sm:px-4 py-2 text-gray-900">{student.course}</td>
                        <td className="px-2 sm:px-4 py-2 text-gray-900">{student.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {preview.length > 5 && (
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    Showing first 5 of {preview.length} students
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 pt-2 sm:pt-4">
            <DialogClose asChild>
              <button
                type="button"
                className="px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
            </DialogClose>
            <button
              type="button"
              className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
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