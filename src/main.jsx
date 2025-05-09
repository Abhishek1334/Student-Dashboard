import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthContextProvider";
import router from "./routes/routes";


ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider 
				router={router} 
				future={{ v7_startTransition: true, v7_relativeSplatPath: true }} 
			/>
		</AuthProvider>
	</React.StrictMode>
);
