

export const DetailCard = ({ icon, title, value, fullWidth = false }) => {
	return (
		<div
			className={`bg-white rounded-xl shadow-sm p-6 border border-gray-100 max-md:p-3
					hover:shadow-md transition-shadow ${
						fullWidth ? "md:col-span-2 lg:col-span-3" : ""
					}`}
		>
			<div className="flex items-center mb-3">
				{icon}
				<h3 className="text-gray-500 font-medium ml-2">{title}</h3>
			</div>
			<p className="text-gray-900 font-medium text-lg">{value || "- - - -"}</p>
			
		</div>
	);
};

