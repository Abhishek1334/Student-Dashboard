import React from "react";

const StudentCardSkeleton = () => {
	return (
		<div className="bg-white rounded-lg border border-gray-200 p-6 overflow-hidden relative">
			{/* Shimmer effect overlay */}
			<div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

			<div className="space-y-4">
				{/* Header */}
				<div className="flex items-start justify-between">
					<div className="space-y-2">
						<div className="h-5 bg-gray-200 rounded-md w-32"></div>
						<div className="h-4 bg-gray-200 rounded-md w-48"></div>
					</div>
					<div className="h-6 bg-gray-200 rounded-full w-20"></div>
				</div>

				{/* Content */}
				<div className="space-y-3">
					<div className="flex items-center">
						<div className="h-4 w-4 bg-gray-200 rounded mr-2"></div>
						<div className="h-4 bg-gray-200 rounded-md w-24"></div>
					</div>
					<div className="flex items-center">
						<div className="h-4 w-4 bg-gray-200 rounded mr-2"></div>
						<div className="h-4 bg-gray-200 rounded-md w-20"></div>
					</div>
					<div className="flex items-center">
						<div className="h-4 w-4 bg-gray-200 rounded mr-2"></div>
						<div className="h-4 bg-gray-200 rounded-md w-32"></div>
					</div>
				</div>

				{/* Footer */}
				<div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
					<div className="h-4 bg-gray-200 rounded-md w-36"></div>
					<div className="h-5 w-5 bg-gray-200 rounded"></div>
				</div>
			</div>
		</div>
	);
};

export default StudentCardSkeleton;
