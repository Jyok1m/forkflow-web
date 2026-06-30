import "./App.css";

import { Routes, Route } from "react-router";
import HomePage from "./pages/Home";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";

function App() {
	return (
		<Routes>
			<Route index element={<HomePage />} />
			<Route path="signin" element={<SignInPage />} />
			<Route path="signup" element={<SignUpPage />} />
		</Routes>
	);
}

export default App;
